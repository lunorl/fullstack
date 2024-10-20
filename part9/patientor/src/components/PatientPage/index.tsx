import { useParams } from "react-router-dom";
import service from "../../services/patients";
import { Patient, HealthCheckRating } from "../../types";
import { useEffect, useState } from "react";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import WorkIcon from "@mui/icons-material/Work";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Alert, Button } from "@mui/material";
import { AddEntry } from "../AddEntry";
export const PatientPage = (): JSX.Element => {
  const [guy, setGuy] = useState<Patient | null>(null);
  const [error, setError] = useState('')
  const [personDictionary, setPersonDictionary] = useState<
    Record<string, string>
  >({});
  const [open, setOpen] = useState(false);
  const id = useParams().id;
  useEffect(() => {
    const getGuy = async () => {
      if (id) {
        const m: Patient = await service.specificId(id);
        setGuy(m);
        if (m.entries) {
          m.entries.forEach((g) => {
            if (g.diagnosisCodes) {
              g.diagnosisCodes.forEach(async (c) => {
                const dict: Record<string, string> = {};
                await Promise.all(
                  m.entries.flatMap(async (entry) => {
                    if (entry.diagnosisCodes) {
                      return Promise.all(
                        entry.diagnosisCodes.map(async (code) => {
                          const p = await service.specificCode(code);
                          dict[code] = p.name;
                        })
                      );
                    }
                    return [];
                  })
                );
                setPersonDictionary(dict);
              });
            } else {
              console.log("false");
            }
          });
        }
      }
    };
    getGuy();
  }, [id]);
  if (guy) {
    let m = null;
    switch (guy.gender) {
      case "male":
        m = <MaleIcon />;
        break;
      case "female":
        m = <FemaleIcon />;
        break;
      default:
        m = null;
        break;
    }
    console.log("s", personDictionary);
    return (
      <div>
        <b className="text-3xl ml-[5%]">{guy.name}</b> {m} <br /> <br />
        <p className="ml-[7%]">ssh: {guy.ssn}</p>
        <p className="ml-[7%]">occupation: {guy.occupation}</p>
        <br />
        {error !== "" ? <Alert severity="error">{error}</Alert> : null}
        {open ? <AddEntry setGuy={setGuy} setError={setError} id={guy.id} setOpen={setOpen}/>: null}
        <b className="text-lg ml-[7%]">entries</b>
        <div>
          {guy.entries
            ? guy.entries.map((g) => (
                <div className=" ml-[5%]" key={g.date}>
                  <div>
                    <p className="ml-[2%] border border-black rounded">
                      {g.date}{" "}
                      {g.type === "OccupationalHealthcare" ? (
                        <WorkIcon />
                      ) : null}{" "}
                      {g.type === "HealthCheck" ? (
                        <MedicalServicesIcon />
                      ) : null}{" "}
                      {g.type === "Hospital" ? <LocalHospitalIcon /> : null}{" "}
                      <br />
                      <i> {g.description}</i> <br />
                      {g.type === "HealthCheck" && g.healthCheckRating === 0 ? (
                        <FavoriteIcon style={{ color: "green" }} />
                      ) : null}
                      {g.type === "HealthCheck" && g.healthCheckRating === 1 ? (
                        <FavoriteIcon style={{ color: "yellow" }} />
                      ) : null}
                      {g.type === "HealthCheck" && g.healthCheckRating === 2 ? (
                        <FavoriteIcon style={{ color: "orange" }} />
                      ) : null}
                      {g.type === "HealthCheck" && g.healthCheckRating === 3 ? (
                        <FavoriteIcon style={{ color: "red" }} />
                      ) : null}
                      <br /> diagnose by {g.specialist}
                    </p>
                  </div>{" "}
                  <br />
                  {g.diagnosisCodes && g.diagnosisCodes.length > 0 ? (
                    <ul className="">
                      {g.diagnosisCodes.map((d) => {
                        return (
                          <li className="list-disc ml-[5%]" key={d}>
                            {d} {personDictionary[d]}
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </div>
              ))
            : null}
        </div>
        <div className="ml-[8%]">
        <Button  variant="contained" onClick={() => setOpen(true)}>
          ADD NEW ENTRY
        </Button>
        </div>
      </div>
    );
  } else {
    return <p>loading...</p>;
  }
};
