using MeetPoint.Domain.Interfaces;

namespace MeetPoint.Domain.ValueObjects;

public readonly struct RangeOnDouble(double min, double max) : IRange<double>
{
	public double Start { get; } = min < max && (min is >= 0 and <= 5) ? min : 0.0;
	public double End { get; } = min < max && (max is >= 0 and <= 5) ? max : 5.0;
	public bool IsInRange(double value) => value.CompareTo(Start) >= 0 && value.CompareTo(End) <= 0;
}
