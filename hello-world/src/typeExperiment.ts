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

type StudentOrIep = Student | Iep;

let david: Student = { student_id: '123a-456b', first_name: 'David', last_name: 'Belinda', grade: '4', assigned_case_manager_id: '097z-654y'}
let david_iep: Iep = { student_id: '123a-456b', iep_id: '3462sdfg', case_manager_id: '097z-654y', start_date: new Date('1-1-2023'), end_date: new Date('12-31-2023'), create_date: new Date()}


// All three of these work
let sample: StudentOrIep = { student_id: '123a-456b', first_name: 'David', last_name: 'Belinda', grade: '4', assigned_case_manager_id: '097z-654y'}
let secondSample: StudentOrIep = { student_id: '123a-456b', iep_id: '3462sdfg', case_manager_id: '097z-654y', start_date: new Date('1-1-2023'), end_date: new Date('12-31-2023'), create_date: new Date()}
let combinedSample: StudentOrIep = {student_id: '123a-456b', first_name: 'David', last_name: 'Belinda', grade: '4', assigned_case_manager_id: '097z-654y', iep_id: '3462sdfg', case_manager_id: '097z-654y', start_date: new Date('1-1-2023'), end_date: new Date('12-31-2023'), create_date: new Date()}
let wackadooSample: StudentOrIep = { student_id: '123a-456b', first_name: 'David', last_name: 'Belinda', grade: '4', assigned_case_manager_id: '097z-654y', nonsense_key_appearing_nowhere: 'blarg'}



// This just translats to Doc.Student = 0, Doc.Iep = 1
enum Doc {
  Student, 
  Iep
}


let belinda: Student = {first_name: 'david', last_name: 'belinda', student_id: '25435y', grade: '8', assigned_case_manager_id: '7u3456'}
// let ambigBelinda: Doc.Student = {first_name: 'david', last_name: 'belinda', student_id: '25435y', grade: '8', assigned_case_manager_id: '7u3456'}


interface IStudent {
  student_id?: string,
  first_name?: string,
  last_name?: string,
  grade?: string,
  assigned_case_manager_id?: string
}


// example
class MyTableClass {
    // list the propeties here, ONLY WRITTEN ONCE
    id = "";
    title = "";
    isDeleted = false;
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// This is the pure interface version, to be used/exported
interface IMyTable extends MyTableClass { };

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Props type as an array, to be exported
type MyTablePropsArray = Array<keyof IMyTable>;

// Props array itself!
const propsArray: MyTablePropsArray =
    Object.keys(new MyTableClass()) as MyTablePropsArray;



interface IUserProfile  {
  id: string;
  name: string;
};
type KeysEnum<T> = { [P in keyof Required<T>]: true };
const IUserProfileKeys: KeysEnum<IUserProfile> = {
  id: true,
  name: true,
};