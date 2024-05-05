import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { Typography } from '@mui/material';
import { styled } from "@mui/material/styles";

type MoreInfoModalProps = {
    title: string;
    data: any;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #cfcfcf',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const EventNameButton = styled(Button)({
    textTransform: 'none',
    fontSize: '0.875rem',
    color: '#000000',
    fontWeight: 400
})

export default function MoreInfoModal({title, data} : MoreInfoModalProps) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    function generateStatus(status: string) {
        switch(status){
            case "not-started":
                return <div className="rounded p-2 w-fit h-[24px] mr-2 align-middle text-xs text-center  text-white bg-[#434d4a]">
                    <Typography fontSize={10}>
                        Not Started 
                    </Typography>
                    </div>;
            case "ongoing":
                return <div className="rounded p-2 w-fit h-[24px] mr-2 align-middle text-xs text-center  text-white bg-[#bde00b]">
                    <Typography fontSize={10}>
                        Ongoing
                    </Typography>
                    </div>;
            case "completed":
                return <div className="rounded p-2 w-fit h-[24px] mr-2 align-middle text-xs text-center  text-white bg-[#00ff00]">
                    <Typography fontSize={10}>
                        Completed
                    </Typography>
                    </div>;
            case "cancelled":
                return <div className="rounded p-2 w-fit h-[24px] mr-2 align-middle text-xs text-center  text-white bg-[#e0210b]">
                    <Typography fontSize={10}>
                        Cancelled
                    </Typography>
                    </div>;
            default:
                return <div className="rounded p-2 w-fit h-[24px] mr-2 align-middle text-xs text-center  text-white bg-[#000000]">
                    <Typography fontSize={10}>
                        Unknown
                    </Typography>
                    </div>;
        }
    }

    function generatePriority(priority: string) {
        switch(priority){
            case "low":
                return <div className="rounded p-2 w-fit h-[24px] mr-2 align-middle text-xs text-center  text-white bg-[#00ff00]">
                    <Typography fontSize={10}>
                        Low 
                    </Typography>
                    </div>;
            case "basic":
                return <div className="rounded p-2 w-fit h-[24px] mr-2 align-middle text-xs text-center  text-white bg-[#bde00b]">
                    <Typography fontSize={10}>
                        Basic
                    </Typography>
                    </div>;
            case "high":
                return <div className="rounded p-2 w-fit h-[24px] mr-2 align-middle text-xs text-center  text-white bg-[#e0720b]">
                    <Typography fontSize={10}>
                        High
                    </Typography>
                    </div>;
            case "vip":
                return <div className="rounded p-2 w-fit h-[24px] mr-2 align-middle text-xs text-center  text-white bg-[#e0210b]">
                    <Typography fontSize={10}>
                        VIP
                    </Typography>
                    </div>;
            default:
                return <div className="rounded p-2 w-fit h-[24px] mr-2 align-middle text-xs text-center  text-white bg-[#000000]">
                    <Typography fontSize={10}>
                        Unknown
                    </Typography>
                    </div>;
        }
    }

    return (
        <div>
        <EventNameButton onClick={handleOpen} >{title}</EventNameButton>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...style }}>
                <div className='m-2 p-2 rounded-lg border'>
                    <h2 className='text-base text-xl'>{title}</h2>
                    <div className='flex flex-row justify-start'>
                        {generatePriority(data.priority)}
                        {generateStatus(data.status)}
                    </div>
                    <p>{data.description}</p>
                    <p>{`${dayjs(data.startDate).format("DD/MM/YYYY")} - ${dayjs(data.endDate).format("DD/MM/YYYY")}`}</p>
                    <p>{`${dayjs(data.startTime).format('hh:mm A')} - ${dayjs(data.endTime).format('hh:mm A')}`}</p>
                </div>
            </Box>
        </Modal>
        </div>
    );
}
