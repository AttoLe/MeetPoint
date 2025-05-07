using MeetPoint.Domain.Enums;

namespace MeetPoint.Domain.ValueObjects;

public readonly record struct RoutesSettings(IReadOnlyCollection<VehicleTypes> VehicleTypes, RangeOnDouble Price, RangeOnTimeSpan Time);
