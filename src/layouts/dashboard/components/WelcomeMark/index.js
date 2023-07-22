import React from "react";

import { Card, Icon } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import PatchImage from "assets/images/patch-image.png"
import jsonReader from "../../../../utils/RiotApi/jsonReader";

import gif from "assets/images/cardimgfree.png";

var patch_version = "未知";
const version_url = "https://ddragon.leagueoflegends.com/api/versions.json";
jsonReader(version_url, (data) => {
    patch_version = data;
})

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
          <VuiTypography color="white" variant="h1" fontWeight="bold" mb="40px">
            欢迎回来！
          </VuiTypography>
          <VuiTypography color="white" variant="h4" fontWeight="bold" mb="18px">
            当前Riot直营服务器版本:  {patch_version}
          </VuiTypography>
          <VuiTypography color="text" variant="h6" fontWeight="regular" mb="auto">
            <strong></strong>
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
            查看国服 {patch_version} 版本改动  !
          <Icon sx={{ fontWeight: "bold", ml: "0px" }}>arrow_forward</Icon>
        </VuiTypography>
      </VuiBox>
    </Card>
  );
};

export default WelcomeMark;
