import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { FaTrash } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaExpeditedssl } from "react-icons/fa";

import AccountSettings from "./account-settings";
import ChangePassword from "./change-password";

const Container = styled.div``;
export const Banner = styled.div`
  height: 120px;
  background-color: blue;
  width: calc(100% + 40px);
  margin: 0 -20px;

  & > h2 {
    margin: 0;
    text-align: center;
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

const AvatarContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 auto;
  position: relative;
  background-color: black;

  & label {
    position: absolute !important;
    top: 0;
    left: 0;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    cursor: pointer;

    & input {
      height: 1px;
      width: 1px;
      overflow: hidden;
      clip: rect(1px, 1px, 1px, 1px);
    }

    & input:is(:focus, :focus-within) + label {
      outline: thin dotted;
    }
  }
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: black;
`;
const Sidenav = styled.nav`
  display: flex;
  flex-direction: column;
  width: 200px;
  padding: 20px 0 0;
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
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 10px 0;
        padding-left: 20px;

        & svg {
          margin-right: 5px;
          color: blue;
          font-size: 18px;
        }
      }
    }
  }
`;
const Btn = styled.button`
  border: none;
  padding: 10px 0;
  color: white;
  background-color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 0 0 0 5px;
  margin-top: auto;

  & svg {
    margin-right: 5px;
  }
`;

const ActionBtns = styled.div`
  margin: 5px auto 3px;

  & button {
    margin-right: 5px;
    padding: 3px 8px;
    border: none;
    outline: 1px solid;
    background-color: red;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
  & button:last-child {
    background-color: blue;
  }
`;
const Error = styled.div`
  text-align: center;
  padding: 20px;
  color: red;
  font-weight: 700;
`;

export default function Settings() {
  const [user, setUser] = useState({});
  const [photo, setPhoto] = useState(null);

  const [isAccount, setIsAccount] = useState(true);
  const [isPassword, setIsPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

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

  // clear error after 5 seconds
  useEffect(() => {
    let timeout;

    if (error) {
      timeout = setTimeout(() => {
        setError(null);
      }, 5000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [error]);

  const AccountHandler = () => {
    setIsAccount(true);
    setIsPassword(false);
  };

  const passwordHandler = () => {
    setIsPassword(true);
    setIsAccount(false);
  };

  const previewProfile = async (e) => {
    let file = e.target.files;

    if (file.length) {
      setPhoto(file[0]);
    } else {
      setPhoto(null);
    }
  };

  const removePreview = () => {
    setPhoto(null);
  };

  const changeProfile = async (e) => {
    const fd = new FormData();
    fd.append("avatar", photo);

    const res = await fetch("/api/users/profile", {
      method: "POST",
      body: fd,
    });

    const data = res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    setMessage(data.message);
    setPhoto(null);
  };

  const handleAccountDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account ?\nBy deleting your account, all your posts and comments will also be deleted!"
      )
    ) {
      const res = await fetch("/api/users/delete-user", {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
      }

      if (res.ok) {
        signOut();
      }
      return;
    }

    return;
  };

  const isUser = Object.keys(user).length !== 0;

  return (
    <Container>
      <Banner>
        <h2>Account Settings</h2>
      </Banner>
      <Card>
        <Sidenav>
          <AvatarContainer>
            {photo ? (
              <Avatar
                src={window.URL.createObjectURL(photo)}
                alt={user.firstName}
                width={80}
                height={80}
              />
            ) : (
              <Avatar
                src={(user && `/api/users/profile/${user._id}/avatar`) || null}
                alt={user.firstName}
                width={80}
                height={80}
              />
            )}

            <label htmlFor="avatar">
              <input
                type="file"
                accept="image/*"
                id="avatar"
                onChange={previewProfile}
              />
            </label>
          </AvatarContainer>
          {photo && (
            <ActionBtns>
              <button onClick={removePreview}>Cancel</button>
              <button onClick={changeProfile}>Update</button>{" "}
            </ActionBtns>
          )}
          <p>
            {user.firstName} {user.lastName}
          </p>
          <ul>
            <li onClick={AccountHandler}>
              <Link href="" scroll={false}>
                <a>
                  <FaUserCircle />
                  Account
                </a>
              </Link>
            </li>
            <li onClick={passwordHandler}>
              <Link href="" scroll={false}>
                <a>
                  <FaExpeditedssl />
                  Password
                </a>
              </Link>
            </li>
          </ul>

          <Btn onClick={handleAccountDelete}>
            <FaTrash />
            Delete Account
          </Btn>
        </Sidenav>

        {isAccount && isUser && <AccountSettings user={user} />}

        {isPassword && <ChangePassword user={user} />}
      </Card>
      {error && <Error>{error}</Error>}
    </Container>
  );
}
