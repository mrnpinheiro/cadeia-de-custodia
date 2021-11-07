import React from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';

import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import CreateIcon from '@mui/icons-material/Create';

import ArrayLocalStorage from '../../utils/array-local-storage';

function ViewRep() {
	const router = useRouter();
  const { id } = router.query;
  const idRep = +id;

  const [rep, setRep] = React.useState();
  const [vestiges, setVestiges] = React.useState();

  React.useEffect(() => {
		if (!idRep) return;
		const savedReps = ArrayLocalStorage.get("reps");
		const foundRep = savedReps.find(item => item.id === idRep);
		setRep(foundRep);

		const savedVestiges = ArrayLocalStorage.get("vestiges");
		const foundVestiges = savedVestiges.filter(item => item.idRep === idRep);
		setVestiges(foundVestiges);
  }, [idRep]);

  return rep ? <>
			<Grid container spacing={2} sx={{ p: 2 }}>
				<Grid item xs={12}>
					<Typography variant="h5">
						<b>Origem</b>
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="body1">
						<b>Tipo de Origem:</b> {rep.typeOrigin}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="body1">
						{rep.numberOrigin}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="body1">
						{rep.foundation}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="body1">
						{rep.yearOrigin}
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
						{rep.street}
					</Typography>
				</Grid>
				<Grid item xs={4}>
					<Typography variant="body1">
						{rep.number}
					</Typography>
				</Grid>
				<Grid item xs={8}>
					<Typography variant="body1">
						{rep.complement}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="body1">
						{rep.district}
					</Typography>
				</Grid>
				<Grid item xs={8}>
					<Typography variant="body1">
						{rep.city}
					</Typography>
				</Grid>
				<Grid item xs={4}>
					<Typography variant="body1">
						{rep.state}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="body1">
						{rep.coordinates}
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
				{vestiges.map((vestige, index) => {
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
		</> : <></>;
}

export default ViewRep;
