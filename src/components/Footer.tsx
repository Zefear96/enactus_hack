import { createStyles, Text, ActionIcon, Group, rem, } from '@mantine/core';
import Link from 'next/link';
import Image from "next/image";
import logo from "../../public/logo.png";
import arcticons_vk from '../../public/arcticons_vk.png';
import arcticons_telegram from '../../public/arcticons_telegram.png';
import phone from '../../public/phone.png';
import instagram from '../../public/instagram.png';
import styles from './footerStyles.module.css';
import { useRouter } from 'next/router';


const useStyles = createStyles((theme) => ({

    logo: {

        [theme.fn.smallerThan('sm')]: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
    },

    inner: {
        display: 'flex',
        justifyContent: 'space-between',
    },

    groups: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '40%',
        justifyContent: 'space-between',
        textAlign: 'center',

        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    wrapper: {
        width: rem(160),
    },

    connect: {
        width: rem(200),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    link: {
        display: 'block',
        // color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
        color: '#000000',
        fontSize: theme.fontSizes.sm,
        paddingTop: rem(3),
        paddingBottom: rem(3),

        '&:hover': {
            textDecoration: 'underline',
        },
    },

    title: {
        fontSize: theme.fontSizes.lg,
        fontWeight: 700,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        marginBottom: `calc(${theme.spacing.xs} / 2)`,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },

    social: {
        [theme.fn.smallerThan('sm')]: {
            marginTop: theme.spacing.xs,
        },
    },
}));

interface FooterLinksProps {
    data: {
        title: string;
        links: { label: string; link: string }[];
    }[];
}

export function FooterLinks({ data }: FooterLinksProps) {
    const { classes } = useStyles();

    const groups = data.map((group) => {
        const links = group.links.map((link, index) => (
            <a key={index}
                className={classes.link}
                href={link.link}
            >
                {link.label}
            </a>
        ));

        return (
            <div className='w-3/6' key={group.title}>
                <Text className={classes.title}>{group.title}</Text>
                {links}
            </div>
        );
    });

    return (
        <footer className={`flex justify-between items-center max-w-screen-xl mx-auto my-7 ${styles.main_footer}`}>
            <Link href="/">
                <Image
                    src={logo}
                    alt="error"
                    width={110}
                    height={120}
                    className="mx-auto"
                />
            </Link>
            <div className={classes.groups}>{groups}</div>
            {/* style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }} */}
            <div className={`w-1/5 flex flex-col items-center ${styles.connect}`}>
                <Text ta='center' className={`${classes.title}`}>Свяжитесь с нами!</Text>
                <Group spacing={0} className={classes.social} position="right" noWrap mt='xs' mb='xs'>
                    <ActionIcon size="lg">
                        {/* <IconBrandTwitter size="1.05rem" stroke={1.5} /> */}
                        <Image src={arcticons_telegram} alt="error" />
                    </ActionIcon>
                    <ActionIcon size="lg">
                        <Image src={instagram} alt="error" />
                    </ActionIcon>
                    <ActionIcon size="lg">
                        <Image src={arcticons_vk} alt="error" />
                    </ActionIcon>
                    <ActionIcon size="lg">
                        <Image src={phone} alt="error" />
                    </ActionIcon>
                </Group>
                <Link href="/reviews/add/" className='w-4/5 m-auto'>
                    <button
                        className="bg-yellowlogin text-bluelogin mb-4 rounded-3xl h-10 hover:bg-bluelogin hover:text-yellowlogin w-full"
                        style={{ boxShadow: '10px 10px 0px 4px #988CE1' }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.boxShadow = "none";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.boxShadow = "10px 10px 0px 4px #988CE1";
                        }}
                    >
                        Напишите нам
                    </button>
                </Link>
                <Text ta='center'>Если у вас есть вопросы?</Text>
            </div>
        </footer>
    );
}