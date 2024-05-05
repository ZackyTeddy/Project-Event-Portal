import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {DataGrid, GridActionsCellItem, GridColDef, GridColumnGroupingModel, GridRenderCellParams} from '@mui/x-data-grid'
import dayjs from "dayjs";
import React from "react";
import { Typography } from "@mui/material";
import { deleteEvent, getEvents } from "../services/events";
import MoreInfoModal from "./MoreInfoModal";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

export default function EventList() {
    const [eventList, setEventList] = useState([]);

    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

    // This method fetches the records from the database.
    useEffect(() => {
        async function getEventList() {
            const response = await getEvents()
            setEventList(response);
        }
        getEventList();
        return;
    }, [eventList]);

    // This method will delete a record
    async function removeEvent(id: number) {
        await deleteEvent(id)
        const newEventList = eventList.filter((el) => el['_id'] !== id);
        setEventList(newEventList);
    }

    // This method will map out the records on the table

    const actionColumn : GridColDef = {
        field: 'actions',
        type: 'actions',
        width: 10,
        getActions: (params) => [
            <GridActionsCellItem
                label="Edit Event"
                onClick={(e: any) => window.location.assign(`/edit/${params.row['_id']}`)}
                showInMenu
            />,
            <GridActionsCellItem
                label="Delete Event"
                onClick={(e: any) => removeEvent(params.row['_id'])}
                showInMenu
            />
        ]
    }

    const columns = React.useMemo<GridColDef[]>(() => [
        {
            field: 'eventName',
            headerName: 'Event Name',
            sortable: true,
            filterable: false,
            minWidth: 300,
            flex: 1,
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <MoreInfoModal title={params.value} data={params.row}/>
                );
            }
        },
        {
            field: 'location',
            headerName: 'Location',
            sortable: true,
            filterable: false,
            minWidth: 80,
            flex: 1
        },
        {
            field: 'startDate',
            headerName: 'Start',
            sortable: false,
            filterable: false,
            maxWidth: 120,
            valueGetter: (value) => {
                return dayjs(value).format('DD/MM/YYYY')
            },
            flex: 1,
        },
        {
            field: 'endDate',
            headerName: 'End',
            sortable: false,
            filterable: false,
            maxWidth: 120,
            valueGetter: (value) => {
                return dayjs(value).format('DD/MM/YYYY')
            },
            flex: 1
        },
        {
            field: 'startTime',
            headerName: 'Start',
            sortable: false,
            filterable: false,
            maxWidth: 120,
            valueGetter: (value) => {
                return dayjs(value).format('hh:mm A')
            },
            flex: 1
        },
        {
            field: 'endTime',
            headerName: 'End',
            sortable: false,
            filterable: false,
            maxWidth: 120,
            valueGetter: (value) => {
                return dayjs(value).format('hh:mm A')
            },
            flex: 1
        },
        {
            field: 'status',
            headerName: 'Status',
            sortable: true,
            filterable: true,
            maxWidth: 100,
            renderCell: (params: GridRenderCellParams<any, string>) => {
                switch(params.value){
                    case "not-started":
                        return <div className="rounded p-2 w-fit h-[24px] my-3 align-middle text-xs text-center m-auto text-white bg-[#434d4a]">
                            <Typography fontSize={10}>
                                Not Started 
                            </Typography>
                            </div>;
                    case "ongoing":
                        return <div className="rounded p-2 w-fit h-[24px] my-3 align-middle text-xs text-center m-auto text-white bg-[#bde00b]">
                            <Typography fontSize={10}>
                                Ongoing
                            </Typography>
                            </div>;
                    case "completed":
                        return <div className="rounded p-2 w-fit h-[24px] my-3 align-middle text-xs text-center m-auto text-white bg-[#00ff00]">
                            <Typography fontSize={10}>
                                Completed
                            </Typography>
                            </div>;
                    case "cancelled":
                        return <div className="rounded p-2 w-fit h-[24px] my-3 align-middle text-xs text-center m-auto text-white bg-[#e0210b]">
                            <Typography fontSize={10}>
                                Cancelled
                            </Typography>
                            </div>;
                    default:
                        return <div className="rounded p-2 w-fit h-[24px] my-3 align-middle text-xs text-center m-auto text-white bg-[#000000]">
                            <Typography fontSize={10}>
                                Unknown
                            </Typography>
                            </div>;
                }
            },
            flex: 1
        },
        {
            field: 'priority',
            headerName: 'Priority',
            sortable: true,
            filterable: false,
            maxWidth: 100,
            renderCell: (params: GridRenderCellParams<any, string>) => {
                switch(params.value){
                    case "low":
                        return <div className="rounded p-2 w-fit h-[24px] my-3 align-middle text-xs text-center m-auto text-white bg-[#00ff00]">
                            <Typography fontSize={10}>
                                Low 
                            </Typography>
                            </div>;
                    case "basic":
                        return <div className="rounded p-2 w-fit h-[24px] my-3 align-middle text-xs text-center m-auto text-white bg-[#bde00b]">
                            <Typography fontSize={10}>
                                Basic
                            </Typography>
                            </div>;
                    case "high":
                        return <div className="rounded p-2 w-fit h-[24px] my-3 align-middle text-xs text-center m-auto text-white bg-[#e0720b]">
                            <Typography fontSize={10}>
                                High
                            </Typography>
                            </div>;
                    case "vip":
                        return <div className="rounded p-2 w-fit h-[24px] my-3 align-middle text-xs text-center m-auto text-white bg-[#e0210b]">
                            <Typography fontSize={10}>
                                VIP
                            </Typography>
                            </div>;
                    default:
                        return <div className="rounded p-2 w-fit h-[24px] my-3 align-middle text-xs text-center m-auto text-white bg-[#000000]">
                            <Typography fontSize={10}>
                                Unknown
                            </Typography>
                            </div>;
                }
            },
            flex: 1
        },
        ...(isLoggedIn ? [actionColumn] : [])
        
    ],[removeEvent]);

    const groupingModel : GridColumnGroupingModel = [
        {
            groupId: 'Basic Info',
            children: [
                {field: 'eventName'},
                {field: 'location'}
            ]
        },
        {
            groupId: 'Event Date',
            children: [
                {field: 'startDate'},
                {field: 'endDate'}
            ]
        },
        {
            groupId: 'Event Time',
            children: [
                {field: 'startTime'},
                {field: 'endTime'}
            ]
        },
        {
            groupId: 'Other Details',
            children: [
                {field: 'status'},
                {field: 'priority'}
            ]
        },
    ]

    // This following section will display the table with the records of individuals.
    return (
        <>
        <h3 className="text-lg font-semibold p-4">Event List</h3>
        <div className="border rounded-lg overflow-hidden">
            <div className="relative w-full overflow-auto">
                <DataGrid
                    rows={eventList}
                    columns={columns}
                    columnGroupingModel={groupingModel}
                    getRowId={(row) => row['_id']}
                    disableRowSelectionOnClick
                    disableColumnSelector
                />
            </div>
        </div>
        </>
    );
}