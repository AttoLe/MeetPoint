namespace MeetPoint.Domain.ValueObjects;

public readonly record struct MapSettings(MapSettings.Participants ParticipantsSettings, bool ViewGeoCenter)
{
	public record Participants
	{
		public bool Enabled { get; set; }

		private readonly Details _settings = new(false, false, false);
		public Details? Settings
		{
			get => Enabled ? _settings : null;
			init => _settings = value ?? Details.Enabled;
		}

		public Participants(bool enabled = true, Details? settings = null)
		{
			Enabled = enabled;
			Settings = settings;
		}

		public readonly record struct Details(bool ViewDistance, bool ViewUpdatedTime, bool ViewIcons)
		{
			public static readonly Details Enabled = new(true, true, true);

		}
	}
}
