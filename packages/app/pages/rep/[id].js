import React from "react";
import Link from 'next/link';

import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import CreateIcon from '@mui/icons-material/Create';

import JSONLocalStorage from '../../utils/json-local-storage';

function viewRep({foundRep, foundVestiges}) {
  return <>
		{foundRep && <>
			<Grid container spacing={2} sx={{ p: 2 }}>
				<Grid item xs={12}>
					<Typography variant="h5">
						<b>Origem</b>
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="body1">
						<b>Tipo de Origem:</b> {foundRep.typeOrigin}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="body1">
						{foundRep.numberOrigin}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="body1">
						{foundRep.foundation}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="body1">
						{foundRep.yearOrigin}
					</Typography>
				</Grid>
			</Grid>
			<Divider />
			<Grid container spacing={2} sx={{ p: 2 }}>
				<Grid item xs={12}>
					<Typography variant="body1">
						Local Perícia:
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="body1">
						{foundRep.street}
					</Typography>
				</Grid>
				<Grid item xs={4}>
					<Typography variant="body1">
						{foundRep.number}
					</Typography>
				</Grid>
				<Grid item xs={8}>
					<Typography variant="body1">
						{foundRep.complement}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="body1">
						{foundRep.district}
					</Typography>
				</Grid>
				<Grid item xs={8}>
					<Typography variant="body1">
						{foundRep.city}
					</Typography>
				</Grid>
				<Grid item xs={4}>
					<Typography variant="body1">
						{foundRep.state}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="body1">
						{foundRep.coordinates}
					</Typography>
				</Grid>
			</Grid>
			<Divider />
			<Grid container spacing={2} sx={{ p: 2 }}>
				<Grid item xs={12}>
					<Typography variant="h5">
						<b>Vestigío</b>
					</Typography>
				</Grid>
				{foundVestiges.map((vestige, index) => {
					const labelId = `checkbox-list-label-${index}`;
					return (
						<ListItem
							key={index}
							secondaryAction={
								<IconButton edge="end" aria-label="comments">
									<CreateIcon />
								</IconButton>
							}
							disablePadding
						>
							<ListItemButton dense>
								<Link href={`/rep/${vestige.idRep}/vestigio/${vestige.idVestige}`}>
									<ListItemText
										id={labelId}
										primary={
											`${vestige.typeVestige} - ${vestige.classPiece}`
										}
									/>
								</Link>
							</ListItemButton>
						</ListItem>
					);
				})}
			</ Grid>
		</>}
	</>;
}

export async function getStaticProps({params}) {
	const reps = JSONLocalStorage.get("reps");
	const foundRep = reps.find(item => item.id === params.id);

	const vestiges = JSONLocalStorage.get("vestiges");
	const foundVestiges = vestiges.filter(item => item.idRep === params.id);

  return {
    props: {
      foundRep,
			foundVestiges
    },
  };
}

export async function getStaticPaths() {
	const reps = JSONLocalStorage.get("reps");
	const repsId = reps.map(item => item.id);

  return { paths: repsId, fallback: true };
}

export default viewRep;
