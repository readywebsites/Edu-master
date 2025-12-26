import { useParams } from "react-router-dom";
import programsData from "../../data/programs.json";
import "./ProgramDetails.css";

const ProgramDetails = () => {
  const { key } = useParams();
  const program = programsData[key];

  if (!program) return <h2>Program not found</h2>;

  return (
    <div className="details-container">
      <h1>{program.title}</h1>
      <p>{program.desc}</p>

      <ul>
        {program.points?.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProgramDetails;
