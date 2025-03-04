import Chat from "./Chat";

const ProjectPage = ({ project }) => {
  return (
    <div>
      <h1>{project.name}</h1>
      <Chat projectId={project._id} user="JohnDoe" />
    </div>
  );
};

export default ProjectPage;
