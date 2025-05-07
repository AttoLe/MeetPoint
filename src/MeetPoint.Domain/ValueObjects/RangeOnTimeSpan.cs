using MeetPoint.Domain.Interfaces;

namespace MeetPoint.Domain.ValueObjects;

public readonly struct RangeOnTimeSpan(TimeSpan start, TimeSpan end) : IRange<TimeSpan>
{
	public TimeSpan Start { get; } = start <= end ? start : TimeSpan.MinValue;
	public TimeSpan End { get; } = start <= end ? end : TimeSpan.MaxValue;

	public bool IsInRange(double value) => value.CompareTo(Start) >= 0 && value.CompareTo(End) <= 0;
}
