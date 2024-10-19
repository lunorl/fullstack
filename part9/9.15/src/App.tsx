interface CoursePartBase {
  name: string;
  exerciseCount: number;
}
interface CoursePartBasic extends CourseDescription {
  kind: "basic";
}
interface CourseDescription extends CoursePartBase {
  description: string;
}

interface CoursePartGroup extends CoursePartBase {
  name: string;
  exerciseCount: number;
  groupProjectCount: string;
  kind: "group";
}
interface CoursePartSpecial extends CourseDescription {
  requirements: string[];
  kind: "special";
}

interface CoursePartBackground extends CourseDescription {
  backgroundMaterial: string;
  kind: "background";
}
type Course =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;
const App = () => {
  const Header = ({ name }: { name: string }): JSX.Element => {
    return <h1>{name}</h1>;
  };
  const neverNone = (part: never): never => {
    throw new Error(
      `Unhandled discrimintaed union member: ${JSON.stringify(part)}`
    );
  };
  const Part = ({ parts }: { parts: Course[] }): JSX.Element => {
    return (
      <div>
        {parts.map((part) => {
          switch (part.kind) {
            case "basic":
              return (
                <div>
                  <div>
                    <b>
                      {part.name} {part.exerciseCount}
                    </b>
                  </div>
                  <em>{part.description}</em>
                  <br />
                  <br />
                </div>
              );
            case "group":
              return (
                <div>
                  <div>
                    <b>
                      {part.name} {part.exerciseCount}
                    </b>
                  </div>
                  project exercises {part.groupProjectCount}
                  <br />
                  <br />
                </div>
              );
            case "background":
              return (
                <div>
                  <div>
                    <b>
                      {part.name} {part.exerciseCount}
                    </b>{" "}
                  </div>
                  <em>{part.description}</em><br /> submit to
                  https://fake-exercise-submit.made-up-url.dev
                  <br /> <br />
                </div>
              );
            case "special":
              return (
                <div>
                  <div>
                    <b>
                      {part.name} {part.exerciseCount}
                    </b>
                  </div>
                  <em>{part.description}</em>
                  <br />
                  required skills:{" "}
                  {part.requirements.join(", ")}
                  <br />
                  <br />
                </div>
              );
            default:
              neverNone(part);
          }
        })}
      </div>
    );
  };
  const Content = ({ parts }: { parts: Course[] }): JSX.Element => {
    return <Part parts={parts} />;
  };
  const Total = ({
    totalExercises,
  }: {
    totalExercises: number;
  }): JSX.Element => {
    return (
      <div>
        <p>Number of exercises {totalExercises}</p>
      </div>
    );
  };
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;
