import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";

const Container = styled.div``;
const Banner = styled.div`
  height: 120px;
  background-color: blue;
  width: calc(100% + 40px);
  margin: 0 -20px;

  & h2 {
    margin: 0;
    padding-top: 30px;
    color: white;
  }
`;

const Card = styled.div`
  display: flex;
  width: 90%;
  max-width: 700px;
  min-width: 350px;
  height: 300px;
  border-radius: 5px;
  margin-top: -30px;
  box-shadow: 1px 1px 2px #333;
  background-color: white;
  margin: -30px auto 0;
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: black;
  margin: 0 auto;
`;
const Sidenav = styled.nav`
  display: flex;
  flex-direction: column;
  width: 200px;
  padding: 20px 0;
  border-right: 1px solid #ddd;

  & p {
    font-size: 1.15rem;
    margin: 3px 0;
    padding-left: 20px;
  }

  & ul {
    margin: 0;
    padding: 0;

    & li:first-child {
      border-top: 1px solid #ddd;
      margin-top: 10px;
    }

    & li {
      list-style: none;

      border-bottom: 1px solid #ddd;

      & :hover {
        background-color: #ddd;
      }

      & a {
        display: block;
        width: 100%;
        height: 100%;
        padding: 10px 0;
        padding-left: 20px;
      }
    }
  }
`;

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
    background-color: blue;
    color: white;
    border: none;
    border-radius: 5px;
  }
`;

export default function Settings() {
  const [user, setUser] = useState({});

  useEffect(() => {
    let mounted = true;

    const fetchUser = async () => {
      const response = await fetch(`/api/users/user`);
      const data = await response.json();

      if (mounted) {
        setUser(data);
      }
    };

    fetchUser();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Container>
      <Banner>
        <h2>Account Settings</h2>
      </Banner>
      <Card>
        <Sidenav>
          <>
            <Avatar src="" alt={user.firstName} width={80} height={80} />
            <p>
              {user.firstName} {user.lastName}
            </p>
          </>
          <ul>
            <li>
              <Link href="">Account</Link>
            </li>
            <li>
              <Link href="">Password</Link>
            </li>
          </ul>
        </Sidenav>
        <Details>
          <h2>Account Settings</h2>
          <form>
            <label htmlFor="firstname">
              First name
              <input type="text" placeholder={user.firstName} id="firstname" />
            </label>
            <label htmlFor="lastname">
              Last name
              <input type="text" placeholder={user.lastName} id="lastname" />
            </label>
            <label htmlFor="email">
              Email
              <input type="email" id="email" placeholder={user.email} />
            </label>
            <button>Update</button>
          </form>
        </Details>
      </Card>
    </Container>
  );
}
