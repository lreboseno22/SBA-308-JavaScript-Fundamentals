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

  // Validate Course ID matches Assignment Group ID
  if(AssignmentGroup.course_id !== course.id){
    throw new Error("Input Invalid: Mismatched Assignment Group to Course")
  }

  // Using today's date
  const today = "2025-08-07";

  // Loop Through Each Assignment
  for(let assignment of AssignmentGroup.assignments){
    const pointsPossible = Number(assignment.points_possible)
    
    // Skip if assignment not due yet
    if(assignment.due_at > today){
      console.log("Skipped because assignment is not due yet");
      continue;
    }

    // Skip if possible points is invalid / zero
    if(isNaN(pointsPossible) || pointsPossible <= 0){
      console.log("Skipped because points possible is invalid");
      continue;
    }

    // Loop Through Each Submission
    for(let submission of submissions){
      console.log(submission.assignment_id, assignment.id);
      if(submission.assignment_id !== assignment.id){
        console.log("Skipped because submission-id doesn't match assignment-id")
        continue;
      }

      let score = Number(submission.submission.score);

      if(isNaN(score)){
        continue;
      }
  
      // Late Submittion = Deduct 10 percent of total points from their submission
      if(submission.submission.submitted_at > assignment.due_at){
        console.log("Late Penalty Applied");
        score -= 0.1 * pointsPossible;
        // So score doesn't go negative
        if(score < 0){
          score = 0;
        }
      }

    }

  }

  return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);

// Helper Functions -------------------------------------
