import React from 'react';
import { motion } from 'framer-motion';
import { sectionVariants, cardVariants, textRevealVariants } from '../utils/animations';
import SectionContainer from './SectionContainer';
import { FaGithub } from "react-icons/fa";


const Works = ({ data }) => {
  const projects = data?.projects || [];

  const getProjectColor = (projectTitle) => {
    if (!projectTitle) return 'var(--dusty-rose)';
    const colors = [
      'var(--dusty-rose)',
      'var(--sage-green)',
      'var(--soft-grey)',
      'var(--deep-rose)',
      'var(--light-sage)'
    ];
    const index = projectTitle.length % colors.length;
    return colors[index];
  };

  const getTechColor = (tech) => {
    const colors = {
      Python: 'var(--sage-green)',
      JavaScript: 'var(--sage-green)',
      Node: 'var(--dusty-rose)',
      'Node.js': 'var(--dusty-rose)'
    };
    return colors[tech] || 'var(--soft-grey)';
  };

  return (
    <SectionContainer id="works" variants={sectionVariants}>
      <motion.div
        className="works-content"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div variants={textRevealVariants}>
          <h2 className="section-title">Works</h2>
        </motion.div>

        <motion.div className="works-grid" variants={cardVariants} style={{ marginTop: 'var(--gap-md)' }}>
          {projects.map((project, idx) => {
            const accent = getProjectColor(project?.title);
            return (
              <motion.div
                key={`project-${project?.title || idx}`}
                className="glass-card works-card"
                variants={cardVariants}
                whileHover={{ y: -4, boxShadow: 'var(--hover-shadow)' }}
                transition={{ duration: 0.25, ease: [0.6, -0.05, 0.01, 0.99] }}
              >
                <div>
                <div
                  className="works-badge"
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    overflow: 'hidden',
                    padding: project?.image ? '0' : '8px',
                    width: '180px',
                    height: '100px',
                    borderRadius: '12px',
                    marginBottom: '12px'
                  }}
                >
                  {project?.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    (project?.title || 'P').charAt(0)
                  )}
                </div>

                  <div className="works-meta">Project</div>
                  <h3 className="works-title">{project?.title || 'Project'}</h3>
                  <p className="works-description">{project?.impact || project?.description || ''}</p>

                  <div className="works-chips">
                    {(project?.technologies || []).map((tech) => (
                      <span
                        key={tech}
                        className="chip"
                        style={{ color: getTechColor(tech) }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="works-actions">
                  {project?.github ? (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost"
                      style={{
                        borderColor: 'var(--dusty-rose)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaGithub size={18} />
                      GitHub
                    </motion.a>
                  ) : null}
                  {project?.live ? (
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Demo
                    </motion.a>
                  ) : null}
                </div>
              </motion.div>
            );
        })}
        </motion.div>
      </motion.div>
    </SectionContainer>
  );
};

export default Works;
