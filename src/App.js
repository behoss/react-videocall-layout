import React, { useState, cloneElement } from "react";

// Utils
import clsx from "clsx";

// Material UI
import { makeStyles, styled } from "@material-ui/core/styles";
import { Box, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: { margin: "10px 120px" },
  button: { margin: "0 10px 10px 0" },
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
  fullWidth: {
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

const ComponentWrapper = styled(Box)({
  border: "1px dashed red",
  position: "relative",
  overflow: "hidden",
});

const FlexBoxContainer = styled(Box)({
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
      className={clsx(classes.localVideo, classes.bottomRightCorner)}
    />
  );

  const LocalVideoClone = cloneElement(LocalVideo);

  const RemoteVideo = (
    <img
      src="./assets/bugs-bunny-looney-tunes-crop.jpg"
      alt="bugs bunny looney toons"
      className={classes.fullWidth}
    />
  );

  const ScreensharingVideo = (
    <img
      src="./assets/screensharing.png"
      alt="screensharing"
      className={classes.fullWidth}
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
          color="default"
          onClick={() => setScreensharing((prevState) => !prevState)}
        >
          Toggle screensharing
        </Button>
      </Box>

      {/* Videos begin */}
      <ComponentWrapper>
        <FlexBoxContainer>
          {screensharing && (
            <Box
              className={clsx(
                classes.screensharingVideoContainer,
                classes.flexItemOneCol,
              )}
            >
              {ScreensharingVideo}
              {LocalVideoClone}
            </Box>
          )}

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

        {!screensharing && LocalVideo}
      </ComponentWrapper>
      {/* Videos end */}

      <Box className={classes.actionButtons}>Action buttons go here</Box>
    </Box>
  );
};

export default App;
