using System.Collections.ObjectModel;

namespace MeetPoint.Domain.ValueObjects;

public readonly record struct WeeklySchedule
{
	public IReadOnlyDictionary<DayOfWeek, DailySchedule> Days { get; }

	public WeeklySchedule(IDictionary<DayOfWeek, DailySchedule> days)
	{
		if (days == null || days.Count != 7)
			throw new ArgumentException("A schedule must contain 7 days.");

		Days = new ReadOnlyDictionary<DayOfWeek, DailySchedule>(days);
	}

	public DailySchedule GetScheduleForDay(DayOfWeek day) => Days[day];

	public readonly record struct DailySchedule
	{
		public TimeOnly Open { get; }
		public TimeOnly Close { get; }

		public DailySchedule(TimeOnly Open, TimeOnly Close)
		{
			if (Open >= Close)
				throw new ArgumentException("Opening time must be before closing time.");
		}

		public bool IsOpenAt(TimeOnly time) => time >= Open && time < Close;
	}
}