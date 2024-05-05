// import axios from "axios";

export const getEvents = async () => {
    try{
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/events/`);
        const resJson = await response.json();
        return resJson;
    } catch(error: any) {
        console.log('Error getting events', error)
    }
}

export const getEvent = async (id: string) => {
    try {
        const response = await fetch( 
            `${import.meta.env.VITE_BASE_URL}/events/${id ? id : 0}`
        );
        const resJson = await response.json();
        return resJson;
    } catch (error: any) {
        console.log('Error getting event', error)
    }
}

export const createEvent = async (data: any) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/events`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return response;
    } catch (error: any) {
        console.log('Error creating event', error)
    }
}

export const updateEvent = async (id: string, data: any) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/events/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return response;
    } catch (error:any) {
        console.log('Error updating event', error)
    }
}

export const deleteEvent = async (id: number) => {
    try{
        await fetch(`${import.meta.env.VITE_BASE_URL}/events/${id}`, {
            method: "DELETE",
        });
    } catch(error: any) {
        console.log('Error deleting event', error)
    }
}
