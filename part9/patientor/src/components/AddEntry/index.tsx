import { Button, createTheme, TextField, ThemeProvider } from "@mui/material";
import { useState } from "react";
import service from "../../services/patients";
const theme = createTheme({
  palette: {
    secondary: {
      main: "#d3d3d3",
    },
    primary: {
      main: "#e23252",
    },
  },
});
const submitStuff1 = async (
  description: string,
  date: string,
  specialist: string,
  healthCheck: string,
  diagnosis: string,
  id: string,

  setError: (error: string) => void,
  setGuy: (guy: string) => void
) => {
  if (Number(healthCheck)) {
    console.log("hihihi");
    const diagnosisCodes = diagnosis.split(",");
    setGuy(
      await service.postEntry(
        id,
        {
          description,
          date,
          specialist,
          healthCheckRating: Number(healthCheck),
          diagnosisCodes,
          type: "HealthCheck",
        },
        setError
      )
    );
  }
};
const submitStuff2 = async (
  description: string,
  date: string,
  specialist: string,
  healthCheck: string,
  diagnosis: string,
  id: string,

  setError: (error: string) => void,
  setGuy: (guy: string) => void,
  employee: string,
  startDate: string,
  endDate: string
) => {
  console.log("hihihi");
  const diagnosisCodes = diagnosis.split(",");
  setGuy(
    await service.postEntry(
      id,
      {
        description,
        date,
        specialist,
        employerName: employee,
        sickLeave: { startDate: startDate, endDate: endDate },
        diagnosisCodes,
        type: "OccupationalHealthcare",
      },
      setError
    )
  );
};
const submitStuff3 = async (
  description: string,
  date: string,
  specialist: string,
  healthCheck: string,
  diagnosis: string,
  id: string,

  setError: (error: string) => void,
  setGuy: (guy: string) => void,
  dater: string,
  criteria: string
) => {
  console.log("hihihi");
  const diagnosisCodes = diagnosis.split(",");
  setGuy(
    await service.postEntry(
      id,
      {
        description,
        date,
        specialist,
        discharge: { date: dater, criteria: criteria },
        diagnosisCodes,
        type: "Hospital",
      },
      setError
    )
  );
};
export const AddEntry = ({
  setOpen,
  id,
  setError,
  setGuy,
}: {
  setOpen: (open: boolean) => void;
  id: string;
  setError: (error: string) => void;
  setGuy: (guy: string) => void;
}): JSX.Element => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheck, setHealthcheck] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [mode, setMode] = useState("1");
  const [employee, setEmployee] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [criteria, setCriteria] = useState("");
  const [dater, setDater] = useState("");

  if (mode === "1") {
    return (
      <ThemeProvider theme={theme}>
        <div className="border-2 border-dotted border-black ml-9">
          <br />
          <h6>
            <b>New HealthCheck entry </b>
          </h6>
          <TextField
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            fullWidth
            variant="standard"
            label="Description"
          ></TextField>{" "}
          <br />
          <TextField
            value={date}
            onChange={({ target }) => setDate(target.value)}
            fullWidth
            variant="standard"
            type="date"
          ></TextField>{" "}
          <br />
          <TextField
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
            fullWidth
            variant="standard"
            label="Specialist"
          ></TextField>{" "}
          <br />
          <TextField
            value={healthCheck}
            onChange={({ target }) => setHealthcheck(target.value)}
            fullWidth
            variant="standard"
            label="Healthcheck rating"
          ></TextField>{" "}
          <br />
          <TextField
            value={diagnosis}
            onChange={({ target }) => setDiagnosis(target.value)}
            fullWidth
            variant="standard"
            label="Diagnosis codes"
          ></TextField>{" "}
          <br />
          <div className="flex justify-between mt-4">
            <Button
              onClick={() => setOpen(false)}
              className="mr-2"
              variant="contained"
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => setMode("2")}
              className="mr-2"
              variant="contained"
              color="primary"
            >
              Occupational Healthcare
            </Button>
            <Button
              onClick={() => setMode("3")}
              className="mr-2"
              variant="contained"
              color="primary"
            >
              Hospital
            </Button>

            <Button
              className=""
              variant="contained"
              color="secondary"
              onClick={() =>
                submitStuff1(
                  description,
                  date,
                  specialist,
                  healthCheck,
                  diagnosis,
                  id,
                  setError,
                  setGuy
                )
              }
            >
              ADD
            </Button>
          </div>
        </div>
      </ThemeProvider>
    );
  } else if (mode === "2") {
    return (
      <ThemeProvider theme={theme}>
        <div className="border-2 border-dotted border-black ml-9">
          <br />
          <h6>
            <b>New Occupational Healthcare entry </b>
          </h6>
          <TextField
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            fullWidth
            variant="standard"
            label="Description"
          ></TextField>{" "}
          <br />
          <TextField
            value={date}
            onChange={({ target }) => setDate(target.value)}
            fullWidth
            variant="standard"
            type="date"
          ></TextField>{" "}
          <br />
          <TextField
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
            fullWidth
            variant="standard"
            label="Specialist"
          ></TextField>{" "}
          <br />
          <TextField
            value={diagnosis}
            onChange={({ target }) => setDiagnosis(target.value)}
            fullWidth
            variant="standard"
            label="Diagnosis codes"
          ></TextField>{" "}
          <TextField
            value={employee}
            onChange={({ target }) => setEmployee(target.value)}
            fullWidth
            variant="standard"
            label="Employee"
          ></TextField>{" "}
          <br /> <br />
          <p className="text-gray-500">Sickleave</p>
          <br />
          <span className="ml-1">
            <TextField
              value={startDate}
              onChange={({ target }) => setStartDate(target.value)}
              fullWidth
              variant="standard"
              type="date"
              label="start"
            ></TextField>{" "}
          </span>
          <span className="ml-1">
            <TextField
              value={endDate}
              onChange={({ target }) => setEndDate(target.value)}
              fullWidth
              variant="standard"
              type="date"
              label="end"
            ></TextField>{" "}
          </span>
          <div className="flex justify-between mt-4">
            <Button
              onClick={() => setOpen(false)}
              className="mr-1"
              variant="contained"
              color="primary"
            >
              Cancel
            </Button>
            <Button onClick={() => setMode("1")} variant="contained">
              HealthCheck
            </Button>
            <Button
              onClick={() => setMode("3")}
              className="mr-2"
              variant="contained"
              color="primary"
            >
              Hospital
            </Button>
            <Button
              className=""
              variant="contained"
              color="secondary"
              onClick={() =>
                submitStuff2(
                  description,
                  date,
                  specialist,
                  healthCheck,
                  diagnosis,
                  id,
                  setError,
                  setGuy,
                  employee,
                  startDate,
                  endDate
                )
              }
            >
              ADD
            </Button>
          </div>
        </div>
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        <div className="border-2 border-dotted border-black ml-9">
          <br />
          <h6>
            <b>New Hospital entry </b>
          </h6>
          <TextField
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            fullWidth
            variant="standard"
            label="Description"
          ></TextField>{" "}
          <br />
          <TextField
            value={date}
            onChange={({ target }) => setDate(target.value)}
            fullWidth
            variant="standard"
            type="date"
          ></TextField>{" "}
          <br />
          <TextField
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
            fullWidth
            variant="standard"
            label="Specialist"
          ></TextField>{" "}
          <br />
          <TextField
            value={diagnosis}
            onChange={({ target }) => setDiagnosis(target.value)}
            fullWidth
            variant="standard"
            label="Diagnosis codes"
          ></TextField>{" "}
          <TextField
            value={employee}
            onChange={({ target }) => setEmployee(target.value)}
            fullWidth
            variant="standard"
            label="Employee"
          ></TextField>{" "}
          <br /> <br />
          <p className="text-gray-500">Discharge</p>
          <br />
          <span className="ml-1">
            <TextField
              value={dater}
              onChange={({ target }) => setDater(target.value)}
              fullWidth
              variant="standard"
              type="date"
              label="date"
            ></TextField>{" "}
          </span>
          <span className="ml-1">
            <TextField
              value={criteria}
              onChange={({ target }) => setCriteria(target.value)}
              fullWidth
              variant="standard"
              label="criteria"
            ></TextField>{" "}
          </span>
          <div className="flex justify-between mt-4">
            <Button
              onClick={() => setOpen(false)}
              className="mr-1"
              variant="contained"
              color="primary"
            >
              Cancel
            </Button>
            <Button onClick={() => setMode("1")} variant="contained">
              HealthCheck
            </Button>
            <Button
              onClick={() => setMode("2")}
              className="mr-2"
              variant="contained"
              color="primary"
            >
              Occupational Healthcare
            </Button>
            <Button
              className=""
              variant="contained"
              color="secondary"
              onClick={() =>
                submitStuff3(
                  description,
                  date,
                  specialist,
                  healthCheck,
                  diagnosis,
                  id,
                  setError,
                  setGuy,
                  dater,
                  criteria
                )
              }
            >
              ADD
            </Button>
          </div>
        </div>
      </ThemeProvider>
    );
  }
};
