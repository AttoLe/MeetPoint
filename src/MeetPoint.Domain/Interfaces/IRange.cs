namespace MeetPoint.Domain.Interfaces;

public interface IRange<T> where T : IComparable<T>
{
	public T Start { get; }
	public T End { get; }

	//for structures this default implementation method should be explicitly copied to avoid boxing 
	public sealed bool IsInRange(T value) => value.CompareTo(Start) >= 0 && value.CompareTo(End) <= 0;
}
