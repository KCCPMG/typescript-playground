type NestDocKey<NestDoc> = {
  // docName: keyof NestDoc
  pk: keyof NestDoc,
  arrName: keyof NestDoc
}

export const belinda = require('./belinda.json');


type Student = {
  student_id: string,
  first_name: string,
  last_name: string,
  email: string,
  assigned_case_manager_id: string
  grade: number,
}


type Iep = {
  iep_id: string,
  student_id: string,
  case_manager_id: string,
  start_date: Date,
  end_date: Date,
  created_at: Date
}


type Goal = {
  goal_id: string,
  iep_id: string,
  description: string,
  category: string,
  created_at: Date,
}


type Subgoal = {
  subgoal_id: string,
  goal_id: string,
  description: string,
  instructions: string,
  target_max_attempts: number,
  created_at: Date,
}


export type NestStudent = Student & {
  ieps?: Array<NestIep>
};

export type NestIep = Iep & {
  goals?: Array<NestGoal>
};

export type NestGoal = Goal & {
  subgoals?: Array<Subgoal>
};

export type NestSubgoal = Subgoal;


type Key<NestDoc> = {
  childrenName: keyof NestDoc
}

// const NestStudentKey: NestDocKey<NestStudent> = {
//   docName: 'student',
//   pk: 'student_id',
//   arrName: 
// }


// type NestIep = {
//   student_id: string,
//   iep_id: string,
//   case_manager_id: string,
//   start_date: Date,
//   end_date: Date,
//   create_date: Date,
//   goals: Array<NestGoal>
// }

// type NestGoal = {
//   goal_id: string,
//   iep_id: string | null,
//   description: string,
//   category: string,
//   created_at: Date,
//   subgoals: Array<NestSubgoal>
// }

// type NestSubgoal = {
//   subgoal_id: string,
//   goal_id: string | null,
//   description: string,
//   instructions: string,
//   target_max_attempts: number | null,
//   created_at: Date,
// }




type DocUnion = NestStudent | NestIep | NestGoal | NestSubgoal;

// type DocUnionKey = keyof DocUnion;

type JoinedTable = {
  student?: Student,
  iep?: Iep,
  goal?: Goal

}

// type NestedDoc = {
//   student_id: string,
//   first_name: string,
//   last_name: string,
//   grade: string,
//   assigned_case_manager_id: string,
//   ieps?: Array<NestIep> 
// }

export type NestEmpty = {};

export type NestStudents = {
  students: Array<NestStudent>
}

export type NestIeps = {
  ieps: Array<NestIep>
}

export type NestGoals = {
  goals: Array<NestGoal>
}

export type NestSubgoals = {
  subgoals: Array<Subgoal>
}

export type NestedDoc = NestStudents | NestIeps | NestGoals | NestSubgoals | NestEmpty;


export type ResultRow = {
  student?: Student,
  iep?: Iep,
  goal?: Goal,
  subgoal?: Subgoal
}

// Jonah's isStudent method from tables/table.ts
export function isStudent(person: Student | Iep): person is Student {
  return (person as Student).student_id !== undefined;
}



export function generateNestedDoc(rows: Array<ResultRow>): NestedDoc | null {

  // determine type
  // let template = {};

  // if (rows.some(row => row.student)) {
  //   template = {students: Array<NestStudent>};
  // } else if (rows.some(row => row.iep)) {
  //   template = {ieps: Array<NestIep>};
  // } else if (rows.some(row => row.goal)) {
  //   template = {rows: Array<NestGoal>};
  // } else if (rows.some(row => row.subgoal)) {
  //   template = {rows: Array<NestSubgoal>}
  // }



  function loadType(rows: Array<ResultRow>): NestedDoc {
    if (rows.some(row => row.student)) {
      return ({students: []} as NestStudents);
    } else if (rows.some(row => row.iep)) {
      return {ieps: []} as NestIeps;
    } else if (rows.some(row => row.goal)) {
      return {goals: []} as NestGoals;
    } else if (rows.some(row => row.subgoal)) {
      return {subgoals: []} as NestSubgoals;
    } else throw("Invalid");
  }

  const compObj = loadType(rows);

  rows.forEach(row => {
    if ((compObj as NestStudents).students !== undefined) {
      if (row.student) {

        const nestStudents = compObj as NestStudents;

        let thisStudent = undefined as NestStudent | undefined;

        console.log('compObj~ ', compObj)
        console.log('nestStudents~ ', nestStudents);
        console.log('nestStudents.students~ ', nestStudents.students);

        thisStudent = nestStudents.students.find(student => student.student_id === row?.student?.student_id);

        if (!thisStudent) {
          nestStudents.students.push(row.student);

          thisStudent = nestStudents.students.find(student => student.student_id === row?.student?.student_id);
        }

        // now descend to iep
        if (row?.iep) {

          let ieps = undefined as NestIep[] | undefined;

          // add ieps array to thisStudent if not already there
          if ((thisStudent as NestStudent).ieps === undefined) {
            (thisStudent as NestStudent).ieps = [];
          } 

          ieps = (thisStudent as NestStudent).ieps;

          let thisIep = undefined as NestIep | undefined;

          // find thisIep and assign
          thisIep = (ieps as NestIep[]).find(iep => iep.iep_id === row.iep?.iep_id)


          // if thisIep not found, create and assign
          if (!thisIep) {
            (thisStudent as NestStudent).ieps?.push(row.iep);
            thisIep = (ieps as NestIep[]).find(iep => iep.iep_id === row.iep?.iep_id)
          }

          // now descend to goal
          if (row?.goal) {

            let goals = undefined as NestGoal[] | undefined;

            if ((thisIep as NestIep).goals === undefined) {
              (thisIep as NestIep).goals = [];
            }

            goals = (thisIep as NestIep).goals;

            let thisGoal = undefined as NestGoal | undefined;

            // find thisGoal and assign
            thisGoal = (goals as NestGoal[]).find(goal => goal.goal_id === row.goal?.goal_id) 

            // if thisGoal not found, create and assign
            if (!thisGoal) {
              (thisIep as NestIep).goals?.push(row.goal);
              thisGoal = (goals as NestGoal[]).find(goal => goal.goal_id === row.goal?.goal_id)
            }

            // now descend to subgoal
            if (row?.subgoal) {

              let subgoals = undefined as NestSubgoal[] | undefined;

              if ((thisGoal as NestGoal).subgoals === undefined) {
                (thisGoal as NestGoal).subgoals = [];
              }

              subgoals = (thisGoal as NestGoal).subgoals;

              let thisSubgoal = undefined as NestSubgoal | undefined;

              // find thisSubgoal and assign
              thisSubgoal = (subgoals as NestSubgoal[]).find(subgoal => subgoal.subgoal_id === row.subgoal?.subgoal_id);

              // if thisSubgoal not found, create and assign
              if (!thisSubgoal) {
                (subgoals as NestSubgoal[]).push(row.subgoal);
                thisSubgoal = (subgoals as NestSubgoal[]).find(subgoal => subgoal.subgoal_id === row.subgoal?.subgoal_id);
              }
            }
          }

        }
      } 
    }

  })
  
  return compObj;


}

