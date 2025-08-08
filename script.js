// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

function getLearnerData(course, ag, submissions) {
  const result = [];
  const learnerObj = {};
  const today = "2025-08-07";

  // Validate Course ID matches Assignment Group ID
  if(ag.course_id !== course.id){
    throw new Error("Input Invalid: Mismatched Assignment Group to Course")
  }

  // Loop Through Each Assignment
  for(let assignment of ag.assignments){
    if(!isAssignmentValid(assignment, today)){
      continue;
    }

    const asgnId = assignment.id;
    const dueDate = assignment.due_at;
    const pointsPossible = Number(assignment.points_possible);

    // Loop Through Each Submission
    for(let submission of submissions){
      if(submission.assignment_id !== asgnId){
        continue;
      }
      const learnerId = submission.learner_id;
      const submittedAt = submission.submission.submitted_at;
      let rawScore = Number(submission.submission.score);

      if(isNaN(rawScore)){
        continue;
      }

      const late = isLate(submittedAt, dueDate);
      const finalScore = applyLatePenalty(rawScore, pointsPossible, late);

      getLearner(learnerObj, learnerId);

      const percentage = Number((finalScore / pointsPossible).toFixed(2));

      // Add data into learnerObj
      learnerObj[learnerId].totalEarned += finalScore;
      learnerObj[learnerId].totalPossible += pointsPossible;
      learnerObj[learnerId].assignment[asgnId] = percentage;
    }
  }
  console.log(learnerObj);
  return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);

// Helper Functions -------------------------------------

function isAssignmentValid(assignment, today){
  const pointsPossible = Number(assignment.points_possible);
  return assignment.due_at <= today && !isNaN(pointsPossible) && pointsPossible > 0;
}

function isLate(submittedAt, dueAt){
  return submittedAt > dueAt;
}

function applyLatePenalty(score, pointsPossible, isLate){
  if(isLate){
    const penalty = 0.1 * pointsPossible;
    score -= penalty;
    return score < 0 ? 0: score;
  }
  return score;
}

function getLearner(obj, learnerId){
  if(!obj[learnerId]){
    obj[learnerId] = {
      id: learnerId,
      totalEarned: 0,
      totalPossible: 0,
      assignment: {}
    };
  }
  return obj[learnerId];
}