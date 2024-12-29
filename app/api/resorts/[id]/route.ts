import { NextResponse } from 'next/server';
import { SkiResort, WeatherData } from 'lib/types';
import { getResortById } from 'lib/utils/resort-service';
import { getWeatherData } from 'lib/utils/weather-service';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const resortId = params.id;
    
    // Validate resort ID
    if (!resortId || typeof resortId !== 'string') {
      return NextResponse.json(
        { error: 'Invalid resort ID' },
        { status: 400 }
      );
    }

    // Fetch resort data
    const resort = await getResortById(resortId);
    console.log('Fetched resort:', resort);
    if (!resort) {
      console.error('Resort not found for ID:', resortId);
      return NextResponse.json(
        { error: 'Resort not found' },
        { status: 404 }
      );
    }

    // Fetch weather data
    const weather = await getWeatherData(resortId);
    console.log('Fetched weather:', weather);
    
    return NextResponse.json({
      resort,
      weather: weather || null
    });
    
  } catch (error) {
    console.error('Error fetching resort data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
