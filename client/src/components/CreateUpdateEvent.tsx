import { Box, FormLabel, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from "dayjs";
import 'dayjs/locale/en-gb';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createEvent, getEvent, updateEvent } from "../services/events";

export default function CreateUpdateEvent() {
    const [form, setForm] = useState({
        eventName: "",
        description: "",
        startDate: dayjs(),
        endDate: dayjs(),
        startTime: dayjs(),
        endTime: dayjs(),
        location: "",
        status: "not-started",
        priority: ""
    });
    const [isNew, setIsNew] = useState(true);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const id = params.id?.toString() || undefined;
            if(!id) return;
            setIsNew(false);
            const response = await getEvent(id)
            if (!response) {
                console.warn(`Record with id ${id} not found`);
                navigate("/");
                return;
            }
            setForm(response);
        }
        fetchData();
        return;
    }, [params.id, navigate]);

    function updateForm(value: any) {
        return setForm((prev) => {
        return { ...prev, ...value };
        });
    }

    async function onSubmit(e: any) {
        e.preventDefault();
        const person = { ...form };
        try {
            let response;
            if (isNew) {
                // if we are adding a new record we will POST to /record.
                response = await createEvent(person);
            } else {
                // if we are updating a record we will PATCH to /record/:id.
                response = await updateEvent(params.id ? params.id : "0", person)
            }

            if (!response?.ok) {
                throw new Error(`HTTP error! status: ${response?.status}`);
            }
        } catch (error) {
        console.error('A problem occurred with your fetch operation: ', error);
        } finally {
        setForm({
            eventName: "",
            description: "",
            startDate: dayjs(),
            endDate: dayjs(),
            startTime: dayjs(),
            endTime: dayjs(),
            location: "",
            status: "not-started",
            priority: ""
        });
        navigate("/");
        }
    }

    const handleStatus = (
        event: React.MouseEvent<HTMLElement>,
        newStatus: string | null,
        ) => {
        updateForm({status: newStatus});
    };

    const handlePriority = (
        event: React.MouseEvent<HTMLElement>,
        newPriority: string | null,
        ) => {
        updateForm({priority: newPriority});
    };

    // This following section will display the form that takes the input from the user.
    return (
        <>
        <h3 className="text-lg font-semibold p-4">Create/Update Event Details</h3>
        <form
            onSubmit={onSubmit}
            className="border rounded-lg overflow-hidden p-4"
        >
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
                <div>
                    <h2 className="text-base font-semibold leading-7 text-slate-900">
                    Event Details
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                    Don't worry, you'll be able to edit these details later!
                    </p>
                </div>

                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: 'fit' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div className="mt-2 flex flex-row">
                            <TextField
                                type="text"
                                label="Event Name"
                                name="eventName"
                                id="eventName"
                                value={form.eventName}
                                className="mx-2"
                                onChange={(e) => updateForm({ eventName: e.target.value })}
                                required
                            />
                            <TextField
                                type="text"
                                label="Location"
                                name="location"
                                id="location"
                                value={form.location}
                                className="mx-2"
                                onChange={(e) => updateForm({ location: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mt-2 flex flex-row">
                            <TextField
                                type="text"
                                label="Description"
                                name="description"
                                id="description"
                                value={form.description}
                                className="mx-2 w-full"
                                onChange={(e) => updateForm({ description: e.target.value })}
                                fullWidth
                            />
                        </div>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                            <div className="mt-2 flex flex-row">
                                <DatePicker 
                                    label="Start Date"
                                    name="startDate"
                                    className="mx-2"
                                    value={dayjs(form.startDate)}
                                    onChange={(val) => updateForm({ startDate: val })}
                                />
                                <DatePicker 
                                    label="End Date"
                                    name="endDate"
                                    className="mx-2"
                                    value={dayjs(form.endDate)}
                                    onChange={(val) => updateForm({ endDate: val})}
                                />
                            </div>
                            <div className="mt-2 flex flex-row">
                                <TimePicker 
                                    label="Start Time"
                                    name="startTime"
                                    className="mx-2"
                                    value={dayjs(form.startTime)}
                                    onChange={(val) => updateForm({ startTime: val })}
                                />
                                <TimePicker 
                                    label="End Time"
                                    name="endTime"
                                    className="mx-2"
                                    value={dayjs(form.endTime)}
                                    onChange={(val) => updateForm({ endTime: val })}
                                />
                            </div>
                        </LocalizationProvider>
                        <div className="mt-2 mx-2 flex flex-row">
                            <FormLabel className="mx-2 text-center align-middle">
                                Status
                            </FormLabel>
                            <ToggleButtonGroup
                                value={form.status}
                                onChange={handleStatus}
                                exclusive
                                size="small"
                            >
                                <ToggleButton 
                                    value="not-started"
                                    sx={{
                                        "&.Mui-selected, &.Mui-selected:hover": {
                                            backgroundColor: '#434d4a',
                                            color: "white",
                                        }
                                    }}
                                >
                                    Not started
                                </ToggleButton>
                                <ToggleButton 
                                    value="ongoing"
                                    sx={{
                                        "&.Mui-selected, &.Mui-selected:hover": {
                                            backgroundColor: '#bde00b',
                                            color: "white",
                                        }
                                    }}
                                >
                                    Ongoing
                                </ToggleButton>
                                <ToggleButton 
                                    value="completed"
                                    sx={{
                                        "&.Mui-selected, &.Mui-selected:hover": {
                                            backgroundColor: '#00ff00',
                                            color: "white",
                                        }
                                    }}
                                >
                                    Completed
                                </ToggleButton>
                                <ToggleButton 
                                    value="cancelled"
                                    sx={{
                                        "&.Mui-selected, &.Mui-selected:hover": {
                                            backgroundColor: '#e0210b',
                                            color: "white",
                                        }
                                    }}
                                >
                                    Cancelled
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                        <div className="mt-2 mx-2 flex flex-row">
                            <FormLabel className="mx-2 text-center align-middle">
                                Priority
                            </FormLabel>
                            <ToggleButtonGroup
                                value={form.priority}
                                onChange={handlePriority}
                                exclusive
                                size="small"
                                defaultValue="basic"
                            >
                                <ToggleButton 
                                    value="low"
                                    sx={{
                                        "&.Mui-selected, &.Mui-selected:hover": {
                                            backgroundColor: '#00ff00',
                                            color: "white",
                                        }
                                    }}
                                >
                                    Low
                                </ToggleButton>
                                <ToggleButton 
                                    value="basic"
                                    sx={{
                                        "&.Mui-selected, &.Mui-selected:hover": {
                                            backgroundColor: '#bde00b',
                                            color: "white",
                                        }
                                    }}
                                >
                                    Basic
                                </ToggleButton>
                                <ToggleButton 
                                    value="high"
                                    sx={{
                                        "&.Mui-selected, &.Mui-selected:hover": {
                                            backgroundColor: '#e0720b',
                                            color: "white",
                                        }
                                    }}
                                >
                                    High
                                </ToggleButton>
                                <ToggleButton
                                    value="vip"
                                    sx={{
                                        "&.Mui-selected, &.Mui-selected:hover": {
                                            backgroundColor: '#e0210b',
                                            color: "white",
                                        }
                                    }}
                                >
                                    VIP
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                    </Box>
                </div>
            </div>
            <input
            type="submit"
            value="Save Event"
            className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
            />
        </form>
        </>
    );
}