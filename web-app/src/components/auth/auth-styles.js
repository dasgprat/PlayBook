export default function styles(theme) {
    return {
        loginRoot: {
            width: '100%',
            height: '100vh',
            backgroundColor: '#333333',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: -1
        },
        bgImage: {
            height: '100vh',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: -1,
        },
        main: {
            width: 'auto',
            display: 'block',
            marginLeft: theme.spacing.unit * 3,
            marginRight: theme.spacing.unit * 3,
            [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
                width: 400,
                marginLeft: 'auto',
                marginRight: 'auto'
            }
        },
        paper: {
            marginTop: theme.spacing.unit * 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: `${
                theme.spacing.unit * 2 // Fix IE 11 issue.
            }px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
        },
        avatar: { margin: theme.spacing.unit, backgroundColor: theme.palette.secondary.main },
        form: { width: '100%', marginTop: theme.spacing.unit },
        submit: { marginTop: theme.spacing.unit * 3 },
        register: { paddingTop: theme.spacing.unit * 2 }
    }; // Fix IE 11 issue.
}
