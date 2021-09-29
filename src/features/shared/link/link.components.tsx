import { FunctionComponent } from "react";
import Link, { LinkProps } from "next/link";
import classes from "./style.module.css";

interface LinkComponentProps {
  linkProps: LinkProps;
  anchorProps?: React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >;
}

const LinkComponent: FunctionComponent<LinkComponentProps> = ({
  linkProps,
  anchorProps,
  children,
}) => {
  return (
    <Link {...linkProps}>
      <a className={classes.anchor} {...anchorProps}>
        {children}
      </a>
    </Link>
  );
};

export default LinkComponent;
