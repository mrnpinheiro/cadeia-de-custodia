import React from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import moment from "moment";

import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';

import ArrayLocalStorage from '../../utils/array-local-storage';

function viewRep() {
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
		const foundVestiges = savedVestiges.filter(item => parseInt(item.idRep) === idRep);
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
						<b>Número da Origem:</b> {rep.numberOrigin}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="body1">
						<b>Órgão:</b> {rep.foundation}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="body1">
						<b>Ano da Origem:</b> {moment(rep.yearOrigin). format('YYYY')}
					</Typography>
				</Grid>
			</Grid>
			<Divider />
			<Grid container spacing={2} sx={{ p: 2 }}>
				<Grid item xs={12}>
					<Typography variant="h6">
						<b>Local Perícia</b>
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="body1">
						{rep.street}, {rep.number} {rep.complement}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="body1">
						{rep.district} - {rep.city} - {rep.state}
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
						<div>
							<b>Vestígio(s)</b>
							<Link href={`/rep/${idRep}/vestigio/cadastro`}>
								<IconButton aria-label="add" color="primary">
									<AddIcon />
								</IconButton>
							</Link>
						</div>
					</Typography>
				</Grid>
				{vestiges.map((vestige, index) => {
					const labelId = `checkbox-list-label-${index}`;
					return (
						<ListItem
							key={index}
							secondaryAction={
								<IconButton edge="end" aria-label="comments">
									<Link href={
										`/rep/${vestige.idRep}/vestigio/${vestige.idVestige}/edit`
									}>
										<CreateIcon />
									</ Link>
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

export default viewRep;
