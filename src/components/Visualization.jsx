import { Box, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import React, { forwardRef } from "react";
import PastTemperature from "./graphs/PastTemperature.jsx";
import PastHumidity from "./graphs/PastHumidity.jsx";
import PastWindSpeed from "./graphs/PastWindSpeed.jsx";
import SimpleAreaChart from "./graphs/PastTempMUI.jsx";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  margin: theme.spacing(1),
  flexGrow: 1,
  textAlign: "center",
  boxShadow: "none",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

// export default function Visualization() {
//   return (
//     <div>
//       <Grid container spacing={2} ref={ref} sx={{ marginTop: 4 }} direction={{ xs: 'column', sm: 'column', md: 'row' }} justifyContent="center">
//         <Item xs={10} md={4}>
//           <Box
//             sx={{
//               border: "1px dashed grey",
//               textAlign: "center",
//               padding: 2,
//             }}
//           >
//             <Typography>1/3 Graph 1</Typography>
//           </Box>
//         </Item>
//         <Item xs={10} md={4}>
//           <Box
//             sx={{
//               border: "1px dashed grey",
//               textAlign: "center",
//               padding: 2,
//             }}
//           >
//             <Typography>1/3 Graph 2</Typography>
//           </Box>
//         </Item>
//         <Item xs={10} md={4}>
//           <Box
//             sx={{
//               border: "1px dashed grey",
//               textAlign: "center",
//               padding: 2,
//             }}
//           >
//             <Typography>1/3 Graph 3</Typography>
//           </Box>
//         </Item>
//       </Grid>
//     </div>
//   );
// }

// eslint-disable-next-line react/display-name
const Visualization = forwardRef(({ id }, ref) => {
  return (
    <div>
      <Grid
        container
        spacing={0}
        ref={ref}
        sx={{ marginTop: 4, margin: 2, padding: 2 }}
        direction={{ xs: "column", sm: "column", md: "row" }}
        justifyContent="center"
      >
        <Item xs={4} sx={{ flexBasis: { xs: "100%", md: "33.33%" } }}>
          <Box
            sx={{
              // border: "1px dashed grey",
              textAlign: "center",
              padding: 2,
              margin: 2,
            }}
          >
            <PastTemperature id={id} />
          </Box>
        </Item>
        <Item xs={4} sx={{ flexBasis: { xs: "100%", md: "33.33%" } }}>
          <Box
            sx={{
              textAlign: "center",
              padding: 2,
            }}
          >
            <PastHumidity id={id} />
          </Box>
        </Item>
        <Item xs={4} sx={{ flexBasis: { xs: "100%", md: "33.33%" } }}>
          <Box
            sx={{
              textAlign: "center",
              padding: 2,
            }}
          >
            <PastWindSpeed id={id} />
            {/* <SimpleAreaChart id={id}/> */}
          </Box>
        </Item>
        <Item xs={4} sx={{ flexBasis: { xs: "100%", md: "33.33%" } }}>
          <Box
            sx={{
              textAlign: "center",
              padding: 2,
            }}
          >
            {/* <List sx={style} aria-label="mailbox folders">
              <ListItem>
                <ListItemText primary="Inbox" />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary="Drafts" />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary="Trash" />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary="Spam" />
              </ListItem>
            </List> */}
            <Demo>
              <List>
                <ListItem>
                    <ListItemText
                    primary="Avg Temperature over the past 24h"
                    // secondary={"secondary"}
                    />
                    <ListItemText
                    primary="10.69"
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                    primary="Avg Humidity over the past 24h"
                    />
                    <ListItemText
                    primary="78.46"
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                    primary="Avg Wind Speed over the past 24h"
                    />
                    <ListItemText
                    primary="3.5"
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                    primary="Main Weather Condition over the past 24h"
                    />
                    <ListItemText
                    primary="Clouds"
                    />
                </ListItem>
              </List>
            </Demo>
          </Box>
        </Item>
      </Grid>
    </div>
  );
});

export default Visualization;
