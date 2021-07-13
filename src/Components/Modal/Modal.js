import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog({ open, title, children, onConfirmAction, onCancelAction, modelText }) {


	return (
		<div>

			<Dialog open={open}>
				<DialogTitle >{title}</DialogTitle>
				<DialogContent>
					{children}
				</DialogContent>
				<DialogActions>
					<Button onClick={() => onCancelAction()} color="primary">
						Cancel
					</Button>
					<Button onClick={() => onConfirmAction(modelText)} color="primary" autoFocus>
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
