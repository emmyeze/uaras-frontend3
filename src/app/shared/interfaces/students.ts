export const NigeriaStates = [
  'Kano',
'Lagos',
'Kaduna',
'Katsina',
'Oyo',
'Rivers',
'Bauchi',
'Jigawa',
'Benue',
'Anambra',
'Borno',
'Delta',
'Imo',
'Niger',
'Akwa Ibom',
'Ogun',
'Sokoto',
'Ondo',
'Osun',
'Kogi',
'Zamfara',
'Enugu',
'Kebbi',
'Edo',
'Plateau',
'Adamawa',
'Cross River',
'Abia',
'Ekiti',
'Kwara',
'Gombe',
'Yobe',
'Taraba',
'Ebonyi',
'Nasarawa',
'Bayelsa',
'FCT'

]
export const utmeSubjectCode = ['PHY','MTH','GOV', 'GEO','POA','FRE','HIS','IGB','LIT','AGR',
'Music','BIO','Home ECO','ART','CHM','CRK','COM','ISS','ECO','Yoruba']

export const utmeProgrammes = [
  'Agriculture Economics &Extension',
'Animal Science & Production',
'Crop Science & Horticulture',
'Fisheries and Aquaculture',
'Food Science and Technology',
'Forestry and Wildlife',
'Soil Science and Land Management',
'Science Education-Integrated Science option',
'Computer Science',
'Mathematics',
'Anatomy',
'Physiology',
'Applied Biochemistry',
'Applied Microbiology',
'Botany',
'Parasitology and Entomology',
'Zoology',
'Science Education-Biology option',
'Science Education-Chemistry option',
'Technical Education-Building/Woodwork Technology option',
'Technical Education-Electrical/ Electronic Technology option',
'Technical Education-Mechanical/ Automobile Technology option',
'Radiography',
'Environmental Health Sciences',
'Nursing Science',
'Medical Laboratory Science',
'Medical Rehabilitation',
'Human Nutrition And Dietetics',
'Medicine',
'Pharmacy',
'Pharm D',
'Geological Sciences',
'Geophysics',
'Physics and Industrial Physics',
'Science Education-Mathematics option',
'Pure & Industrial Chemistry',
'Statistics',
'Agricultural and Bio- resources Engineering',
'Chemical Engineering',
'Industrial Production Engineering',
'Mechanical Engineering',
'Metallurgical/ Material Engineering',
'Polymer and Textile Engineering',
'Electronics and Computer Engineering',
'Civil Engineering',
'Electrical Engineering',
'Petroleum Engineering',
'Building',
'Library and Information Science',
'Africa & Asian Studies-Chinese Option',
'Philosophy',
'Early Childhood and Primary Education',
'Guidance and Counseling- Health option',
'Guidance and Counseling- Biology option',
'Africa & Asian Studies-Igbo Option',
'Linguistics',
'Modern European Languages',
'Fine and Applied Arts',
'Law',
'Human Kinetics',
'Health Education',
'Psychology',
'Geography & Meteorology',
'Physics',
'Adult and Continuing Education-Accounting Option',
'Adult and Continuing Education-Economics Option',
'Adult and Continuing Education-Marketing Option',
'Adult and Continuing Education-Mass Communication Option' ,
'Adult and Continuing Education-Political Science Option',
'Adult and Continuing Education-Accounting Option' ,
'Educational Management-Science Option',
'Educational Management-Arts Option'    ,
'Educational Management-Social/Environmental Option',
'Educational Management-Management Option',
'Science Education- Computer Science Option',
'Environmental Management',
'Architecture',
'Quantity Surveying',
'Surveying and Geo-informatics',
'Business Education',
'Business Administration',
'Marketing',
'Estate Management',
'Cooperative Economics and Management',
'Entrepreneurship',
'Economics',
'Accountancy',
'Banking and Finance',
'Education Political Science',
'Political Science',
'English Language & literature',
'Sociology',
'Theatre Arts',
'Mass Communication',
'Education English',
'Music',
'Religion and Human Relations',
'Education History',
'Education French',
'Education Religion',
'Education Economics',
'Education Igbo',
'Education Fine& Applied Art',
'Education Music',
'Public Administration',
'Agricultural Education',
'Home Economics Education',
]


export interface Student {
  reg_num: string;
  fullname: string;
  // firstName: string;
  // lastName: string;
  // middleName: string;
  sex: string;
  state: string;
  utme_aggregate: number;
  department: string;
  lga: string;
  subject_1: string;
  subject_1_score: number;
  subject_2: string;
  subject_2_score: number;
  subject_3: string;
  subject_3_score: number;
  english_score: number;
  phone: string;
  email: string;
  password: string;
  bio_data?: any;


}


export interface PassMark {
  id: number,
  year: string,
  passmark: number,
  current: boolean
}

export interface StatusMessage{

status:string,
status_message: string,
time_taken: string,
total_rowdata_uploaded_to_api:number,
rowdata_saved_to_temp: number,
new_rowdata_in_main:number,
rowdata_info_updated:number,
rowdata_processed_success:number,
rowdata_error:number,
type: string

}
