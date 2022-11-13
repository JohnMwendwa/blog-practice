import styled from "styled-components";

const Btn = styled.button``;

export default function IconBtn({ Icon, isActive, color, children, ...props }) {
  return (
    <Btn
      className={`${isActive ? "icon-btn-active" : ""} ${color || ""}`}
      {...props}
    >
      <span className={`${children !== null ? "icon-mg" : ""}`}>
        <Icon />
      </span>

      {children}
    </Btn>
  );
}
