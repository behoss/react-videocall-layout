import React, { useState, cloneElement } from "react";

// Utils
import clsx from "clsx";

// Material UI
import { makeStyles, styled } from "@material-ui/core/styles";
import { Box, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  hide: { display: "none" },
  root: { margin: "10px 120px" },
  button: { margin: "0 10px 10px 0" },
  wrapper: {
    border: "1px dashed red",
    position: "relative",
    overflow: "hidden",
  },
  flexItemOneCol: { flexBasis: "100%" },
  flexItemTwoCol: {
    flexBasis: "50%",
  },
  flexItemThreeCol: {
    flexBasis: `${100 / 3}%`,
  },
  flexItemFourCol: {
    flexBasis: "25%",
  },
  remoteVideo: {
    width: "100%",
  },
  localVideo: {
    position: "absolute",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.5)",
    borderRadius: "5px",
    width: "15%",
  },
  bottomRightCorner: {
    bottom: "15px",
    right: "12px",
  },
  screensharingVideo: { width: "100%" },
  screensharingVideoContainer: {
    position: "relative",
  },
  remoteVideoContainer: {
    position: "relative", // This is the parent container for overlay, that's why
    // Last child is overlay component
    "&:hover $overlay": {
      opacity: "1",
    },
    overflow: "hidden", // Overlay component may overflow in smaller screens
  },
  overlay: {
    position: "absolute",
    bottom: "0",
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 80%)",
    color: "#f1f1f1",
    width: "100%",
    transition: ".1s ease-out",
    opacity: "0",
    fontSize: "1rem",
    fontFamily: "Helvetica",
    padding: ".5rem",
    textAlign: "center",
  },
  actionButtons: {
    color: "white",
    backgroundColor: "grey",
    textAlign: "center",
  },
}));

const FlexBoxContainer = styled("div")({
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "center",
  alignItems: "center",
});

const App = () => {
  const classes = useStyles();

  const [addStream, setAddStream] = useState(1);
  const [screensharing, setScreensharing] = useState(false);

  const LocalVideo = (
    <img
      src="./assets/cyborg.jpg"
      alt="cyborg"
      className={clsx(classes.localVideo, classes.bottomRightCorner, {
        [classes.hide]: screensharing,
      })}
    />
  );

  const LocalVideoClone = cloneElement(LocalVideo, {
    className: clsx(classes.localVideo, classes.bottomRightCorner, {
      [classes.hide]: !screensharing,
    }),
  });

  const RemoteVideo = (
    <img
      src="./assets/bugs-bunny-looney-tunes-crop.jpg"
      alt="bugs bunny looney toons"
      style={{ width: "100%" }}
    />
  );

  const ScreensharingVideo = (
    <img
      src="./assets/screensharing.png"
      alt="screensharing"
      className={classes.screensharingVideo}
    />
  );

  return (
    <Box className={classes.root}>
      <Box>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={() => setAddStream((prevState) => prevState + 1)}
        >
          Add remote stream ({`${addStream}`})
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          onClick={() => setAddStream((prevState) => prevState - 1)}
        >
          Remove remote stream
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="grey"
          onClick={() => setScreensharing((prevState) => !prevState)}
        >
          Toggle screensharing
        </Button>
      </Box>

      {/* Videos begin */}
      <Box className={classes.wrapper}>
        <FlexBoxContainer>
          <Box
            className={clsx(
              classes.screensharingVideoContainer,
              classes.flexItemOneCol,
              {
                [classes.hide]: !screensharing,
              },
            )}
          >
            {ScreensharingVideo}
            {LocalVideoClone}
          </Box>

          {Array.from({ length: addStream }, (_, index) => (
            <Box
              className={clsx(classes.remoteVideoContainer, {
                [classes.flexItemFourCol]: screensharing || addStream > 9,
                [classes.flexItemThreeCol]: addStream > 4,
                [classes.flexItemTwoCol]: addStream >= 2 && addStream <= 4,
                [classes.flexItemOneCol]: addStream === 1,
              })}
              key={index}
            >
              {RemoteVideo}
              <Box className={classes.overlay}>Caller's name</Box>
            </Box>
          ))}
        </FlexBoxContainer>

        {LocalVideo}
      </Box>
      {/* Videos end */}

      <Box className={classes.actionButtons}>Action buttons go here</Box>
    </Box>
  );
};

export default App;
