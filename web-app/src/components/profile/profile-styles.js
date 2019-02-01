export default theme => ({
    root: {
        [theme.breakpoints.up('sm')]: {
            alignItems: 'center'
        }
    },
    shortInput: {
        width: 290
    },
    gender: {
        flexDirection: 'row'
    },
    password: {
        width: 200
    },
    formGroup: {
        margin: 4,
        padding: 4
    },
    header: {
        backgroundColor: theme.palette.primary.light,
        height: 50,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        zIndex: 999
    },
    spacer: {
        height: 50
    },
    link: {
        textDecoration: 'none'
    },
    saveButton: {
        marginRight: 'auto',
        marginLeft: 10
    },
    skillChipsContainer: {
        display: 'flex',
        flexWrap: 'wrap'
    }, skillChip: {
        margin: 3
    }
});