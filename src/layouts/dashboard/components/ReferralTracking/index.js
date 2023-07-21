import React from 'react';
import { Card, Stack } from '@mui/material';
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import colors from 'assets/theme/base/colors';
import { FaEllipsisH } from 'react-icons/fa';
import linearGradient from 'assets/theme/functions/linearGradient';
import CircularProgress from '@mui/material/CircularProgress';

function ReferralTracking() {
	const { info, gradients } = colors;
	const { cardContent } = gradients;

	return (
		<Card
			sx={{
				height: '100%',
				background: linearGradient(gradients.cardDark.main, gradients.cardDark.state, gradients.cardDark.deg)
			}}>
			<VuiBox sx={{ width: '100%' }}>
				<VuiBox
					display='flex'
					alignItems='center'
					justifyContent='space-beetween'
					sx={{ width: '100%' }}
					mb='40px'>
					<VuiTypography variant='lg' color='white' mr='auto' fontWeight='bold'>
						正在直播的热门主播
					</VuiTypography>
					<VuiBox
						display='flex'
						justifyContent='center'
						alignItems='center'
						bgColor='#22234B'
						sx={{ width: '37px', height: '37px', cursor: 'pointer', borderRadius: '12px' }}>
						<FaEllipsisH color={info.main} size='18px' />
					</VuiBox>
				</VuiBox>
			</VuiBox>
		</Card>
	);
}

export default ReferralTracking;
