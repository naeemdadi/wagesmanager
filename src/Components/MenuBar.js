import React from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { Tooltip } from "@material-ui/core";
import { PeopleAltRounded, ExitToApp, AccountCircle } from "@material-ui/icons";
import { useHistory } from "react-router";
import { auth } from "../firebase";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    cursor: "pointer",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "flex",
  },
}));

export default function PrimarySearchAppBar({ authUser, searchHandler }) {
  const classes = useStyles();
  const history = useHistory();

  const signOutHandler = () => {
    history.push("/signin");
    auth.signOut();
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            className={classes.title}
            variant="h6"
            noWrap
            onClick={() => {
              history.push("/");
            }}
          >
            {authUser ? authUser.displayName : "WagesManager"}
          </Typography>
          {authUser && (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onChange={searchHandler}
              />
            </div>
          )}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {authUser ? (
              <Tooltip title="Employees">
                <IconButton
                  aria-label="employees"
                  color="inherit"
                  onClick={() => history.push("/employees")}
                >
                  <PeopleAltRounded fontSize="large" />
                </IconButton>
              </Tooltip>
            ) : null}

            {authUser ? (
              <Tooltip title="Signout">
                <IconButton
                  aria-label="signout"
                  color="inherit"
                  onClick={signOutHandler}
                >
                  <ExitToApp fontSize="large" />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="SignIn">
                <IconButton
                  aria-label="signout"
                  color="inherit"
                  onClick={() => history.push("/signin")}
                >
                  <AccountCircle fontSize="large" />
                </IconButton>
              </Tooltip>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
