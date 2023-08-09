import React, { useEffect} from "react";
import {Card, Icon} from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import PatchImage from "assets/images/patch-image.jpg"
import jsonReader from "../../../../utils/json/jsonReader";
const {app, remote, ipcRenderer} = window.require('electron')

export let patch_version = "未知";
export let summoner_infos = "";
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
    });
    // 组件卸载时解除监听
    return () => {
      ipcRenderer.removeAllListeners('data-from-main');
    };
  }, []);

    return (
        <Card sx={() => ({
            height: "540px",
            py: "32px",
            backgroundImage: `url(${PatchImage})`,
            backgroundSize: "cover",
            backgroundPosition: "50%"
        })}>
            <VuiBox height="100%" display="flex" flexDirection="column" justifyContent="space-between">
                <VuiBox>
                    <VuiTypography color="white" variant="h3" fontWeight="bold" mb="40px">
                        欢迎回来, {summonerInfo.displayName}!
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
                    href="https://www.leagueoflegends.com/zh-tw/news/game-updates/?_ga=2.268287366.96370311.1691609768-2107092356.1688805993&_gl=1*17oqwfz*_ga*MjEwNzA5MjM1Ni4xNjg4ODA1OTkz*_ga_FXBJE5DEDD*MTY5MTYwOTc2Ni40LjEuMTY5MTYwOTc5MS4zNS4wLjA."
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
                    查看 {patch_version} 版本改动 !
                    <Icon sx={{fontWeight: "bold", ml: "10px"}}>arrow_forward</Icon>
                </VuiTypography>
            </VuiBox>
        </Card>
    );
};

export default WelcomeMark;
