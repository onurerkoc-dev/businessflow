
CREATE TABLE services (
                          id BIGINT NOT NULL AUTO_INCREMENT,
                          name VARCHAR(120) NOT NULL,
                          slug VARCHAR(150) NOT NULL,
                          description TEXT,
                          is_active BOOLEAN NOT NULL DEFAULT TRUE,
                          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
                              ON UPDATE CURRENT_TIMESTAMP,

                          PRIMARY KEY (id),
                          CONSTRAINT uk_services_slug UNIQUE (slug)
);
