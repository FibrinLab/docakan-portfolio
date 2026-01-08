import { NextRequest, NextResponse } from 'next/server';

// GitHub username - set via environment variable or update here
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || '';

export async function GET(request: NextRequest) {
  const username = process.env.GITHUB_USERNAME || '';
  
  if (!username) {
    return NextResponse.json({ 
      error: 'GitHub username not configured. Set GITHUB_USERNAME in .env',
      contributions: []
    }, { status: 200 });
  }

  try {
    // Fetch contribution data from GitHub GraphQL API
    const query = `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                  color
                }
              }
            }
          }
        }
      }
    `;

    const variables = { username };
    const token = process.env.GITHUB_TOKEN; // Optional: for higher rate limits

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && token !== 'ghp_your_token_here' && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GitHub API error:', response.status, errorText);
      return NextResponse.json({ 
        contributions: [],
        error: `GitHub API error: ${response.status}`
      });
    }

    const data = await response.json();
    
    if (data.errors) {
      console.error('GitHub GraphQL errors:', data.errors);
      return NextResponse.json({ 
        contributions: [],
        error: data.errors[0]?.message || 'GitHub API error'
      });
    }

    const calendar = data.data?.user?.contributionsCollection?.contributionCalendar;
    
    if (!calendar) {
      return NextResponse.json({ 
        contributions: [],
        error: 'User not found or no contribution data available'
      });
    }

    // Flatten the weeks into a single array of days
    const contributions = calendar.weeks.flatMap((week: any) => 
      week.contributionDays.map((day: any) => ({
        date: day.date,
        count: day.contributionCount,
        color: day.color,
      }))
    );

    if (contributions.length === 0) {
      return NextResponse.json({ 
        contributions: [],
        error: 'No contribution data found'
      });
    }

    return NextResponse.json({
      contributions,
      total: calendar.totalContributions,
    });
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error);
    return NextResponse.json({ 
      contributions: [],
      error: `Failed to fetch contributions: ${error instanceof Error ? error.message : 'Unknown error'}`
    });
  }
}
