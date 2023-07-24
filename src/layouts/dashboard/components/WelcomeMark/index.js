import React, { useEffect} from "react";
import {Card, Icon} from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import PatchImage from "assets/images/patch-image.png"
import jsonReader from "../../../../utils/json/jsonReader";
const {app, remote, ipcRenderer} = window.require('electron')

let patch_version = "未知";
let summonerName = "未知"
export let summoner_infos;
const version_url = "https://ddragon.leagueoflegends.com/api/versions.json";

jsonReader(version_url, (data) => {
    patch_version = data[0];
})

const WelcomeMark = () => {
  const [summonerInfo, setSummonerInfo] = React.useState("未知");

  useEffect(() => {
    ipcRenderer.send('react-effect-loaded', '');
    // 监听从main.js发送来的数据
    ipcRenderer.on('data-to-react', (event, data) => {
      // 在这里处理接收到的数据
      // 示例：更新state中的token值
      setSummonerInfo(data);
      summoner_infos = data;
      console.log(data)
    });

    // 组件卸载时解除监听
    return () => {
      ipcRenderer.removeAllListeners('data-from-main');
    };
  }, []);

  console.log(summonerInfo);
  summonerName = summonerInfo.displayName;

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
                    <VuiTypography color="info" variant="h3" fontWeight="bold" mb="40px">
                        欢迎回来, {summonerName}!
                    </VuiTypography>
                    <VuiTypography color="white" variant="h4" fontWeight="bold" mb="18px">
                        当前Riot直营服务器版本: {patch_version}
                    </VuiTypography>
                    <VuiTypography color="text" variant="h6" fontWeight="regular" mb="auto">
                        <strong></strong>
                        <br/>
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
                    查看国服 {patch_version} 版本改动 !
                    <Icon sx={{fontWeight: "bold", ml: "0px"}}>arrow_forward</Icon>
                </VuiTypography>
            </VuiBox>
        </Card>
    );
};

export default WelcomeMark;
