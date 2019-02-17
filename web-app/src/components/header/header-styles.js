export default theme => ({
    header: {
        padding: 20,
        backgroundColor: theme.palette.primary.light,
        marginTop: 0,
        alignItems: 'center',
        width: '100vw',
        height: 90,
        display: 'flex',
        position: 'relative',
        [theme.breakpoints.up('sm')]: {
            justifyContent: 'center'
        }
    },
    logoIcon: {
        position: 'absolute',
        left: '0',
        marginLeft: 10
    },
    searchBar: {
        borderRadius: 15,
        backgroundColor: 'white',
        padding: 4,
        width: 240,
        [theme.breakpoints.up('sm')]: {
            width: 200
        },
        [theme.breakpoints.up('md')]: {
            width: 500
        }
    },
    searchInput: {
        marginLeft: theme.spacing.unit * 1.3,
        fontSize: 20
    },
    avatar: {
        backgroundColor: '#cccccc',
        [theme.breakpoints.up('sm')]: {
            width: 50,
            height: 50
        },
        [theme.breakpoints.up('md')]: {
            width: 60,
            height: 60
        },
        cursor: 'pointer'
    },
    link: {
        textDecoration: 'none'
    },
    profileAvatarWrapper: {
        position: 'absolute',
        top: '50%',
        right: '0',
        marginRight: 10,
        transform: 'translateY(-50%)'
    }
});
