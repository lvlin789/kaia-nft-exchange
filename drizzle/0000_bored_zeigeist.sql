CREATE TABLE `tokens_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`address` text NOT NULL,
	`symbol` text NOT NULL,
	`name` text NOT NULL,
	`contractAddress` text NOT NULL,
	`decimal` integer NOT NULL,
	`verified` integer DEFAULT 0 NOT NULL,
	`totalSupply` text NOT NULL,
	`implementationAddress` text,
	`balance` text NOT NULL,
	`authorized` integer DEFAULT 0 NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text
);
