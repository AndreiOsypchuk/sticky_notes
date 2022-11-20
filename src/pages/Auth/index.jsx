import React from "react";
import { ReactComponent as Logo } from "../../Logo.svg";
import { Requester } from "../../utils/api";
import { RootContext } from "../../store/context";
import { Actions } from "../../store/actions";
import { useNavigate } from "react-router-dom";
const AuthPageTypes = {
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
};

const initInput = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirm: "",
};

export const Auth = () => {
  const [pageType, setPageType] = React.useState(AuthPageTypes.REGISTER);
  const { dispatch } = React.useContext(RootContext);
  const navigate = useNavigate();
  React.useEffect(() => console.log(pageType), []);

  const switchType = (type) => {
    setPageType(() => type);
  };

  const onSubmit = async (data) => {
    if (pageType === AuthPageTypes.REGISTER) {
      try {
        const response = await Requester.post("/auth/register", data);
        console.log(response.data);
        dispatch({ type: Actions.LOG_IN });
        navigate("/");
      } catch (e) {
        console.log(e.response.data, e.response.status);
      }
    } else if (pageType === AuthPageTypes.LOGIN) {
      try {
        const response = await Requester.post("/auth/login", data);
        console.log(response.data);
        dispatch({ type: Actions.LOG_IN });
        navigate("/");
      } catch (e) {
        console.log(e.response.data, e.response.status);
      }
    }
  };

  return pageType === AuthPageTypes.REGISTER ? (
    <RegisterForm switchPageType={switchType} onSubmit={onSubmit} />
  ) : (
    <LogInForm switchPageType={switchType} onSubmit={onSubmit} />
  );
};

const RegisterForm = ({ switchPageType, onSubmit }) => {
  const [input, setInput] = React.useState(initInput);

  const changeType = () => switchPageType(AuthPageTypes.LOGIN);
  const onChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    setInput((i) => ({ ...i, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onSubmit(input);
  };
  return (
    <>
      <div className=" flex justify-center h-screen w-full">
        <div className="flex flex-col justify-center items-center max-w-sm ">
          <div className="flex flex-col justify-center items-center mb-12">
            <Logo className="w-16 h-16" />
            <h1 className="mt-3 text-2xl text-slate-500">Sticky Notes</h1>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center gap-3"
          >
            <div className="flex items-center w-full gap-11">
              <Input
                label="First Name"
                value={input.firstName}
                name="firstName"
                onChange={onChange}
              />
              <Input
                label="Last Name"
                value={input.lastName}
                name="lastName"
                onChange={onChange}
              />
            </div>
            <Input
              label="Email"
              value={input.email}
              name="email"
              onChange={onChange}
            />
            <Input
              label="Password"
              value={input.password}
              name="password"
              onChange={onChange}
            />
            <Input
              label="Confirm Password"
              value={input.confirm}
              name="confirm"
              onChange={onChange}
            />
            <button
              type="submit"
              className="bg-slate-500 w-full h-12 p-4 text-white rounded-md flex items-center justify-center"
            >
              Submit
            </button>
          </form>
          <button
            onClick={changeType}
            className="underline text-sm text-blue-500 mt-4"
          >
            Already have an account?
          </button>
        </div>
      </div>
    </>
  );
};

const LogInForm = ({ switchPageType, onSubmit }) => {
  const [input, setInput] = React.useState(initInput);

  const changeType = () => switchPageType(AuthPageTypes.REGISTER);
  const onChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    setInput((i) => ({ ...i, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onSubmit(input);
  };
  return (
    <>
      <div className=" flex justify-center h-screen w-full">
        <div className="flex flex-col justify-center items-center max-w-sm">
          <div className="flex flex-col justify-center items-center mb-12">
            <Logo className="w-16 h-16" />
            <h1 className="mt-3 text-2xl text-slate-500">Sticky Notes</h1>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center gap-3 w-96"
          >
            <Input
              label="Email"
              value={input.email}
              name="email"
              onChange={onChange}
            />
            <Input
              label="Password"
              value={input.password}
              name="password"
              onChange={onChange}
            />
            <button
              type="submit"
              className="bg-slate-500 w-full h-12 p-4 text-white rounded-md flex items-center justify-center"
            >
              Log In
            </button>
          </form>
          <button
            onClick={changeType}
            className="underline text-sm text-blue-500 mt-4"
          >
            Dont't have an account?
          </button>
        </div>
      </div>
    </>
  );
};

const Input = (props) => {
  return (
    <div className="mb-4 flex flex-col w-full">
      <label htmlFor={props.label}>{props.label}</label>
      <input
        {...props}
        className="h-12 rounded-md p-4 w-full border-slate-400 border-2"
      />
    </div>
  );
};
