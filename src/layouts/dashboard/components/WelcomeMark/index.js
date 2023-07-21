import React from "react";

import { Card, Icon } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import PatchImage from "assets/images/patch-image.png"

import gif from "assets/images/cardimgfree.png";

const WelcomeMark = () => {
  return (
    <Card sx={() => ({
      height: "340px",
      py: "32px",
      backgroundImage: `url(${PatchImage})`,
      backgroundSize: "cover",
      backgroundPosition: "50%"
    })}>
      <VuiBox height="100%" display="flex" flexDirection="column" justifyContent="space-between">
        <VuiBox>
          <VuiTypography color="Black" variant="h4" fontWeight="bold" mb="12px">
            欢迎回来！
          </VuiTypography>
          <VuiTypography color="Black" variant="h3" fontWeight="bold" mb="18px">
            当前国服版本：13.14
          </VuiTypography>
          <VuiTypography color="text" variant="h6" fontWeight="regular" mb="auto">
            <strong>留空</strong>
            <br />
          </VuiTypography>
        </VuiBox>
        <VuiTypography
          component="a"
          href="https://lol.qq.com/gicp/news/410/37032269.html"
          target={"_blank"}
          variant="button"
          color="white"
          fontWeight="regular"
          sx={{
            mr: "5px",
            display: "inline-flex",
            alignItems: "center",
            cursor: "pointer",

            "& .material-icons-round": {
              fontSize: "1.125rem",
              transform: `translate(2px, -0.5px)`,
              transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
            },

            "&:hover .material-icons-round, &:focus  .material-icons-round": {
              transform: `translate(6px, -0.5px)`,
            },
          }}
        >
            查看 13.14 版本改动  !
          <Icon sx={{ fontWeight: "bold", ml: "0px" }}>arrow_forward</Icon>
        </VuiTypography>
      </VuiBox>
    </Card>
  );
};

export default WelcomeMark;
