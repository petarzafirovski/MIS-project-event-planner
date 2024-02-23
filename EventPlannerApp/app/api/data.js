import axios from 'axios'

export interface Event {
  Type?: string;
  Name?: string;
  EventStartDate?: string;
  EventEndDate?: string;
  Poster?: string;
  EventCenter?: string;
  EventCenterLocation?: {
    Latitude?: number;
    Longitude?: number;
  };
  BriefDescription?: string;
  TicketSalesLink?: string;
  IsFree?: boolean;
  Picture?: string;
  EventUrl?: string;
  Artist?: string;
  CreatedBy?: string;
}

export const getEventById = async (id) => {
  try {
    const response = await axios.get(`http://10.0.2.2:5000/api/Events/get-event/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching event with id:${id}`, error);
    throw error;
  }
  };

  export const getAllEvent = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:5000/api/Events/get-events');
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  };

  export const createNewEvent = async (eventDetails: Event) => {
    try{
      const response = await axios.post('http://10.0.2.2:5000/api/Events/add-event', 
      { Type: eventDetails.Type,
        Name: eventDetails.Name,
        EventStartDate: eventDetails.EventStartDate,
        EventEndDate: eventDetails.EventEndDate,
        Poster: eventDetails.Poster,
        EventCenter: eventDetails.EventCenter,
        EventCenterLocation: {
          Latitude: eventDetails.EventCenterLocation.Latitude,
          Longitude: eventDetails.EventCenterLocation.Longitude,
        },
        BriefDescription: eventDetails.BriefDescription,
        TicketSalesLink: eventDetails.TicketSalesLink,
        IsFree: eventDetails.IsFree,
        Picture: eventDetails.Picture,
        EventUrl: eventDetails.Name.toLowerCase().replace(/\s+/g, "-"),
        Artist: eventDetails.Artist,
        CreatedBy: eventDetails.CreatedBy
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    return response.status;
    }
    catch(error){
      console.error('Error creating event:', error);
      throw error;
    }
    
  };

  export const getEventsByCategory = (category, allEvents) => {
    return allEvents.filter((event) => event.Type === category);
  };

