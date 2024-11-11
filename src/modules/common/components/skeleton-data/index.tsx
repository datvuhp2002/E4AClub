import React from "react";
import { Box, Grid, Skeleton } from "@mui/material";
import Card from "../Card";

const SkeletonData = () => {
  return (
    <Card title={<Skeleton variant="text" width="100%" />}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Skeleton variant="rectangular" width="100%" height={250} />
          <Box mt={1}>
            {[...Array(4)].map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width="100%"
                height={15}
                sx={{ mb: 1 }}
              />
            ))}
          </Box>
        </Grid>

        {/* Column 2 */}
        <Grid item xs={6}>
          <Skeleton variant="rectangular" width="100%" height="100%" />
        </Grid>

        {/* Column 3 */}
        <Grid item xs={4}>
          <Skeleton variant="rectangular" width="100%" height="100%" />
        </Grid>
      </Grid>
    </Card>
  );
};

export default SkeletonData;
