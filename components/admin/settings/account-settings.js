import styled from "styled-components";

const Details = styled.div`
  padding-left: 20px;
  margin: 0 auto;

  & label {
    display: block;

    & input {
      padding: 5px 10px;
      margin-bottom: 10px;
      display: block;
      border: none;
      outline: 1px solid;
    }
  }

  & button {
    width: 100%;
    padding: 8px 0;
    margin-top: 5px;
    background-color: blue;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

export default function AccountSettings({ user }) {
  return (
    <Details>
      <h2>Account Settings</h2>
      <form>
        <label htmlFor="firstname">
          First name
          <input type="text" value={user.firstName} id="firstname" />
        </label>

        <label htmlFor="lastname">
          Last name
          <input type="text" value={user.lastName} id="lastname" />
        </label>

        <label htmlFor="email">
          Email
          <input type="email" id="email" value={user.email} />
        </label>

        <button>Update</button>
      </form>
    </Details>
  );
}
