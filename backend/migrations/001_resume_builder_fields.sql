-- Additive migration: preserves existing rows and supports fields already present in the React editor.
ALTER TABLE education
  ADD COLUMN start_date_label VARCHAR(100) NULL,
  ADD COLUMN end_date_label VARCHAR(100) NULL;

ALTER TABLE experience
  ADD COLUMN start_date_label VARCHAR(100) NULL,
  ADD COLUMN end_date_label VARCHAR(100) NULL;

ALTER TABLE certifications
  ADD COLUMN issue_date_label VARCHAR(100) NULL;

ALTER TABLE projects
  ADD COLUMN role VARCHAR(200) NULL;

ALTER TABLE achievements
  ADD COLUMN achievement_date VARCHAR(100) NULL;

CREATE TABLE experience_bullets (
  id INT NOT NULL AUTO_INCREMENT,
  experience_id INT NOT NULL,
  bullet_text TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  KEY fk_experience_bullet (experience_id),
  CONSTRAINT fk_experience_bullet FOREIGN KEY (experience_id)
    REFERENCES experience (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE project_bullets (
  id INT NOT NULL AUTO_INCREMENT,
  project_id INT NOT NULL,
  bullet_text TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  KEY fk_project_bullet (project_id),
  CONSTRAINT fk_project_bullet FOREIGN KEY (project_id)
    REFERENCES projects (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
