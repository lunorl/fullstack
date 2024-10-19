import { useEffect, useState, SyntheticEvent } from "react";
import { Entry, Visibility, Weather } from "./types";
import { getEntries, sendEntry } from "./assets/services/EntryService";
import "./index.css";
const submitEntry = async (
  date: string,
  visibility: Visibility,
  weather: Weather,
  comment: string,
  setError: (error: string) => void,
  setEntries: (entries: Entry[]) => void,
  entries: Entry[]
) => {
  const s = await sendEntry({ date, visibility, weather, comment }, setError);
  if (s) {
    setEntries(entries.concat(s));
  }
};
const Notification = ({ error }: { error: string }) => {
  console.log(error);
  if (error === "") {
    return null;
  } else {
    return (
      <div>
        <p className="red">{error}</p>
      </div>
    );
  }
};
const AddEntry = ({
  date,
  visibility,
  weather,
  comment,
  setDate,
  setVisibility,
  setWeather,
  setComment,
  setError,
  error,
  setEntries,
  entries,
}: {
  error: string;
  date: string;
  visibility: Visibility | string;
  weather: string | Weather;
  comment: string;
  setDate: (date: string) => void;
  setVisibility: (visibility: string) => void;
  setWeather: (weather: string) => void;
  setComment: (comment: string) => void;
  setError: (error: string) => void;
  setEntries: (entries: Entry[]) => void;
  entries: Entry[];
}): JSX.Element => {
  return (
    <div>
      <h2>Add new entry</h2>
      <Notification error={error} />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          submitEntry(
            date,
            visibility as Visibility,
            weather as Weather,
            comment,
            setError,
            setEntries,
            entries
          );
          setComment('')
          setDate('')
          setVisibility('')
          setWeather('')
        }}
      >
        date
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <div>
          visibility
          {Object.values(Visibility).map((name) => (
            <label key={name}>
              <input
                key={name}
                type="radio"
                name="s"
                value={name}
                onChange={(event) => setVisibility(event.target.value)}
                checked={visibility === name}
              />{" "}
              {name}
            </label>
          ))}
        </div>
        <div>
          weather
          {Object.values(Weather).map((name) => (
            <label key={name}>
              <input
                type="radio"
                name="w"
                value={name}
                checked={weather === name}
                onChange={(event) => setWeather(event.target.value)}
              />{" "}
              {name}
            </label>
          ))}
        </div>
        <div>
          comment
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};
const Entries = ({ entries }: { entries: Entry[] }): JSX.Element => {
  return (
    <div>
      <h2>Diary entries</h2>
      {entries.map((entry) => {
        return (
          <div key={entry.id}>
            <h3>{entry.date}</h3>
            <br />
            visibility: {entry.visibility} <br />
            weather: {entry.weather}
            <br />
            <br />
          </div>
        );
      })}
      ;
    </div>
  );
};
function App() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState<Visibility | string>("");
  const [weather, setWeather] = useState<Weather | string>("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    getEntries().then((entries) => setEntries(entries));
  }, []);
  return (
    <div>
      <AddEntry
        entries={entries}
        setEntries={setEntries}
        error={error}
        date={date}
        visibility={visibility}
        weather={weather}
        comment={comment}
        setDate={setDate}
        setVisibility={setVisibility}
        setWeather={setWeather}
        setComment={setComment}
        setError={setError}
      />
      <Entries entries={entries} />
    </div>
  );
}

export default App;
