/*markdown
Creating Tables
*/

-- CREATE TABLE users (
--     user_id INT AUTO_INCREMENT PRIMARY KEY,
--     email VARCHAR(255) NOT NULL,
--     password VARCHAR(255) NOT NULL
-- );

-- CREATE TABLE user_details (
--     user_id INT PRIMARY KEY,
--     full_name VARCHAR(255) NOT NULL,
--     about_yourself TEXT,
--     address TEXT,
--     personal_website_link TEXT,
--     github_link TEXT
-- );

-- CREATE TABLE experience_helper_table (
--     user_id INT,
--     experience_id INT
-- );

-- CREATE TABLE experience (
--     experience_id INT AUTO_INCREMENT PRIMARY KEY,
--     company_name VARCHAR(255) NOT NULL,
--     company_location VARCHAR(255),
--     job_title VARCHAR(255),
--     start_date DATE,
--     end_date DATE,
--     description TEXT,
--     skills_used TEXT
-- );

-- CREATE TABLE education_helper_table (
--     user_id INT,
--     education_id INT
-- );

-- CREATE TABLE education (
--     education_id INT AUTO_INCREMENT PRIMARY KEY,
--     institute_name VARCHAR(255) NOT NULL,
--     institute_location VARCHAR(255),
--     degree VARCHAR(255),
--     course VARCHAR(255),
--     start_date DATE,
--     end_date DATE,
--     grade VARCHAR(255),
--     skills_used TEXT
-- );

-- CREATE TABLE courses (
--     course_id INT AUTO_INCREMENT PRIMARY KEY,
--     course_title VARCHAR(255) NOT NULL,
--     course_description TEXT,
--     course_instructor VARCHAR(255),
--     course_duration INT,
--     course_profile_icon BLOB,
--     course_banner BLOB,
--     course_skills TEXT
-- );

-- CREATE TABLE course_student_helper_table (
--     course_id INT,
--     user_id INT,
--     progress INT,
--     completion BOOLEAN
-- );

-- CREATE TABLE course_video_helper_table (
--     course_id INT,
--     course_video_id INT
-- );

-- CREATE TABLE course_video (
--     course_video_id INT AUTO_INCREMENT PRIMARY KEY,
--     video_title VARCHAR(255) NOT NULL,
--     video_description TEXT,
--     video BLOB,
--     video_duration INT
-- );

-- CREATE TABLE course_video_student_helper_table (
--     course_video_id INT,
--     user_id INT,
--     finished BOOLEAN
-- );

-- CREATE TABLE course_quiz_helper_table (
--     course_id INT,
--     course_quiz_id INT
-- );

-- CREATE TABLE course_quiz (
--     course_quiz_id INT AUTO_INCREMENT PRIMARY KEY,
--     quiz_title VARCHAR(255) NOT NULL,
--     quiz_description TEXT,
--     quiz_duration INT
-- );

-- CREATE TABLE course_quiz_question_helper_table (
--     course_quiz_id INT,
--     course_quiz_question_id INT
-- );

-- CREATE TABLE course_quiz_question (
--     course_quiz_question_id INT AUTO_INCREMENT PRIMARY KEY,
--     question TEXT,
--     option1 VARCHAR(255),
--     option2 VARCHAR(255),
--     option3 VARCHAR(255),
--     option4 VARCHAR(255),
--     correct_option VARCHAR(255)
-- );

-- CREATE TABLE course_quiz_student_helper_table (
--     course_quiz_question_id INT,
--     user_id INT,
--     answer VARCHAR(255),
--     correct BOOLEAN
-- );

-- CREATE TABLE reading_list (
--     reading_list_id INT AUTO_INCREMENT PRIMARY KEY,
--     reading_list_title VARCHAR(255) NOT NULL,
--     reading_list_description TEXT,
--     reading_list_skills TEXT,
--     reading_list_image TEXT,
--     reading_list_banner TEXT
-- );

-- CREATE TABLE reading_list_contents_helper_table (
--     reading_list_id INT,
--     reading_list_content_id INT
-- );

-- CREATE TABLE reading_list_content (
--     reading_list_content_id INT AUTO_INCREMENT PRIMARY KEY,
--     content_title VARCHAR(255) NOT NULL,
--     content_description TEXT
-- );

-- CREATE TABLE quizes (
--     quiz_id INT AUTO_INCREMENT PRIMARY KEY,
--     quiz_title VARCHAR(255) NOT NULL,
--     quiz_description TEXT,
--     quiz_duration INT,
--     quiz_skills_required TEXT,
--     quiz_level VARCHAR(255),
--     quiz_image TEXT,
--     quiz_no_of_questions INT
-- );

-- CREATE TABLE quiz_question_helper_table (
--     quiz_id INT,
--     quiz_question_id INT
-- );

-- CREATE TABLE quiz_question (
--     quiz_question_id INT AUTO_INCREMENT PRIMARY KEY,
--     question TEXT,
--     option1 VARCHAR(255),
--     option2 VARCHAR(255),
--     option3 VARCHAR(255),
--     option4 VARCHAR(255),
--     correct_option VARCHAR(255)
-- );

-- CREATE TABLE quiz_student_helper_table (
--     quiz_question_id INT,
--     user_id INT,
--     answer VARCHAR(255),
--     correct BOOLEAN
-- );